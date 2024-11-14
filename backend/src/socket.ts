import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { IThreats } from "./models/ThreatsModel";
import { SubtractAmmunition } from "./services/MissilesService";



export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // Join a room
    socket.on("join", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });
    // Leave a room
    socket.on("leave", (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room ${room}`);
    });

    // שידור לחדר
    socket.on("message-to-room", async(room : string, message:IThreats) => {
      const threats = await SubtractAmmunition(message.idUser, message.missileName, message.location, message.status);
      io.to(room).emit("room-message", threats); // שלח הודעה לחדר ספציפי
    });

    socket.on("disconnect", (reason) => {
      console.log("A user disconnected", socket.id, "reason:", reason);
    });
  });

  return io;
}
