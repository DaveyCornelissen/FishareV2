#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /src
COPY ["Fishare.UserService.Composition/Fishare.UserService.Composition.csproj", "Fishare.UserService.Composition/"]
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
EXPOSE 80
WORKDIR /app
COPY --from=build-env /src/out .
ENTRYPOINT ["dotnet", "Fishare.UserService.dll"]