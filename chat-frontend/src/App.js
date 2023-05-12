import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lobby from "./components/Lobby";
import React, { Component, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Chat from "./components/Chat";

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7030/chat")
        .configureLogging(LogLevel.Information)
        .build();

      //Receive Message From the Server
      connection.on("ReceiveMessage", (user, message) => {
        setMessages((messages) => [...messages, { user, message }]);
      });

      //Start the Connection
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat messages={messages} />
      )}
    </div>
  );
};

export default App;
