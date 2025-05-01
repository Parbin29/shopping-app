import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:5177/notifications")
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default connection;
