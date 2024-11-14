import React, { useEffect, useState } from "react";
import Login from "./components/RegistrationAndLogin/Login";
import Register from "./components/RegistrationAndLogin/Register";
import { Route, Routes } from "react-router-dom";
import PrivateRouteToken from "./components/PrivateRoute/PrivateRouteToken";
import WarPage from "./components/War/WarPage";
import { useSocket } from "./hooks/useSocket";

const App: React.FC = () => {
    const {
        connected,
        messages,
        room,
        joinRoom,
        leaveRoom,
        sendMessageToRoom,
        broadcastMessage,
        sendRequest,
      } = useSocket();
      const [newMessage, setNewMessage] = useState<string>('');
      const [roomName, setRoomName] = useState<string>(''); // State for room name input
    
      useEffect(() => {
        if (connected) {
          joinRoom('general'); // Join a default room when connected
        }
      }, [connected]);
    
      const handleMessageSend = () => {
        if (newMessage.trim()) {
          sendMessageToRoom(newMessage);
          setNewMessage(''); // Clear message input
        }
      };
  return (
    <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/war" element={<PrivateRouteToken><WarPage/></PrivateRouteToken>} />
        </Routes>
    </div>
  );
};

export default App;
