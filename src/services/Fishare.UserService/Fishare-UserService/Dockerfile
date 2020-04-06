#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Fishare-UserService/Fishare.UserService.csproj", "Fishare-UserService/"]
COPY ["Fishare.Userserice.DAL/Fishare.UserService.DAL.csproj", "Fishare.Userserice.DAL/"]
COPY ["Fishare-User.Data.Model/Fishare.UserService.Model.csproj", "Fishare-User.Data.Model/"]
RUN dotnet restore "Fishare-UserService/Fishare.UserService.csproj"
COPY . .
WORKDIR "/src/Fishare-UserService"
RUN dotnet build "Fishare.UserService.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Fishare.UserService.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Fishare.UserService.dll"]