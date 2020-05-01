using Fishare.UserService.Broker.Events;
using Fishare.UserService.Broker.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Fishare.UserService.Broker
{
    public class RabbitWorker : BackgroundService
    {
        private readonly ILogger _logger;
        private readonly RabbitOptions _options;
        private IModel _channel;
        private IRabbitService _rabbitService;
        private IPooledObjectPolicy<IModel> _provider;
        private IServiceScopeFactory _scopeFactory;

        public RabbitWorker(ILoggerFactory loggerFactory, IOptions<RabbitOptions> options, IServiceScopeFactory scopeFactory)
        {
            _logger = loggerFactory.CreateLogger<RabbitWorker>();
            _options = options.Value;
            _scopeFactory = scopeFactory;

            using (var serviceScope = scopeFactory.CreateScope())
            {
                _provider = serviceScope.ServiceProvider.GetRequiredService<IPooledObjectPolicy<IModel>>();
                _channel = _provider.Create();
            }
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {
                //convert bytes to string
                string payload = Encoding.UTF8.GetString(ea.Body.ToArray());

                // received message  
                try
                {
                    using (var serviceScope = _scopeFactory.CreateScope())
                    {
                        _rabbitService = serviceScope.ServiceProvider.GetRequiredService<IRabbitService>();

                        var content = JsonConvert.DeserializeObject<EventContent>(payload);
                        // handle the received message  
                        _rabbitService.Recieve(content.pattern, content.data);
                    }
                }
                finally
                {
                    //_logger.LogInformation($"consumer received {content}");
                    _channel.BasicAck(ea.DeliveryTag, false);
                }
            };

            consumer.Shutdown += OnConsumerShutdown;
            consumer.Registered += OnConsumerRegistered;
            consumer.Unregistered += OnConsumerUnregistered;
            consumer.ConsumerCancelled += OnConsumerConsumerCancelled;

            _channel.BasicConsume(_options.Queue, false, consumer);
            return Task.CompletedTask;
        }

        private void OnConsumerConsumerCancelled(object sender, ConsumerEventArgs e) { }
        private void OnConsumerUnregistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerRegistered(object sender, ConsumerEventArgs e) { }
        private void OnConsumerShutdown(object sender, ShutdownEventArgs e) { }

        public override void Dispose()
        {
            _channel.Close();
            _provider.Return(_channel);
            base.Dispose();
        }
    }
}
