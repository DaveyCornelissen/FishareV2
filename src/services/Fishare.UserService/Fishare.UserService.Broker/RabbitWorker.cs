using Fishare.UserService.Broker.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;
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
    public class RabbitWorker : BackgroundService, IPooledObjectPolicy<IModel>
    {
        private readonly ILogger _logger;
        private readonly RabbitOptions _options;
        private IRabbitService rabbitService;
        private IConnection _connection;
        private IModel _channel;

        public RabbitWorker(ILoggerFactory loggerFactory, IOptions<RabbitOptions> options)
        {
            this._logger = loggerFactory.CreateLogger<RabbitWorker>();
            this._options = options.Value;
            this.rabbitService = new RabbitService();
            InitRabbitMQ();
        }

        private void InitRabbitMQ()
        {
            var factory = new ConnectionFactory { 
                HostName = _options.HostName, 
                Port = _options.Port, 
                UserName = _options.UserName, 
                Password = _options.Password, 
                VirtualHost = _options.VHost
            };

            // create connection  
            _connection = factory.CreateConnection();

            // create channel  
            _channel = Create();


            _channel.QueueBind(_options.Queue, _options.Exchange, _options.Queue + ".*", null);
            //_channel.BasicQos(0, 1, false);

            _connection.ConnectionShutdown += RabbitMQ_ConnectionShutdown;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (ch, ea) =>
            {


                // handle the received message  
                rabbitService.Recieve(ea);
                Console.WriteLine(ea.ToString());
                //_logger.LogInformation($"consumer received {content}");
                _channel.BasicAck(ea.DeliveryTag, false);
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
        private void RabbitMQ_ConnectionShutdown(object sender, ShutdownEventArgs e) { }

        public override void Dispose()
        {
            _channel.Close();
            _connection.Close();
            base.Dispose();
        }

        public IModel Create()
        {
            return _connection.CreateModel();
        }

        public bool Return(IModel obj)
        {
            if (obj.IsOpen)
            {
                return true;
            }
            else
            {
                obj?.Dispose();
                return false;
            }
        }
    }

}
