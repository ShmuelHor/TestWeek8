import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

type CallbackResponse = { status: string };

type Message = {
    _id?: string;
  missileName: string;
  location: string;
  idUser: string;
  status: string;
  speed?: number;
};




export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [threats, setThreats] = useState<Message[]>([]);
  const [room, setRoom] = useState<string>(""); // מעקב אחרי החדר הנוכחי

  useEffect(() => {
    const socketInstance = io(SERVER_URL);
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected:", socketInstance.id);
      setConnected(true);
    });

    socketInstance.on("disconnect", (reason: string) => {
      console.log("Disconnected:", reason);
      setConnected(false);
    });

    socketInstance.on("room-message", (message: Message[]) => {
      console.log("Room message received:", message);
      setThreats(message);
    });

    socketInstance.on("broadcast-message", (message: Message) => {
      console.log("Broadcast message received:", message);
    //   setThreats((prev) => [...prev, message]);
    });

    socketInstance.on("heartbeat", (data: { time: string }) => {
      console.log("Heartbeat received: ", data);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  function joinRoom(room: string) {
    if (socket) {
      socket.emit("join", room);
      setRoom(room); // עדכון מצב החדר הנוכחי
      console.log(`Joining room: ${room}`);
    }
  }

  function leaveRoom(room: string) {
    if (socket) {
      socket.emit("leave", room);
      setRoom(""); // איפוס מצב החדר כשעוזבים
      console.log(`Leaving room: ${room}`);
    }
  }

  function sendMessageToRoom(room: string, message: Message) {
    if (socket && room) {
      socket.emit("message-to-room", room, message);
      console.log(`Sending message to room ${room}:`, message);
    }
  }

  function broadcastMessage(message: Message) {
    if (socket) {
      socket.emit("broadcast", message); // שליחת הודעת שידור לכל הלקוחות חוץ מהשולח
      console.log(`Broadcasting message: `, message);
    //   setThreats(message); // כששולחים שידור, כל הלקוחות מקבלים את ההודעה חוץ מהשולח
    }
  }

  function sendRequest(
    data: Message,
    callback: (response: CallbackResponse) => void
  ) {
    if (socket) {
      socket.emit("request", data, (response: CallbackResponse) => {
        console.log("Request response: ", response);
        callback(response);
      });
    }
  }

  return {
    connected,
    threats,
    room,
    joinRoom,
    leaveRoom,
    sendMessageToRoom,
    broadcastMessage,
    sendRequest,
  };
}
