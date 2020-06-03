#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["Fishare.APIGateway/Fishare.APIGateway.csproj", "Fishare.APIGateway/"]
RUN dotnet restore "Fishare.APIGateway/Fishare.APIGateway.csproj"
COPY . .
WORKDIR "/src/Fishare.APIGateway"
RUN dotnet build "Fishare.APIGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Fishare.APIGateway.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Fishare.APIGateway.dll"]