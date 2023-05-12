import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Lobby from "./components/Lobby";
import React, { useState } from "react";
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

      //Close Connection
      connection.onclose(e=>{
        setConnection();
        setMessages([]);
      })

      //Start the Connection
      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  //Send Messages
  const sendMessage = async (message) =>{
      try {
        await connection.invoke("SendMessage", message);
      } catch (e) {
        console.log(e)
      }
  }

  //Close Connection
  const closeConnection = async() =>{
    try {
      await connection.stop();
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="app">
      <h2>MyChat</h2>
      <hr className="line" />
      {!connection ? (
        <Lobby joinRoom={joinRoom} />
      ) : (
        <Chat sendMessage={sendMessage} messages={messages} closeConnection={closeConnection} />
      )}
    </div>
  );
};

export default App;
