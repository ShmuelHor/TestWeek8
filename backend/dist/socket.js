"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketServer = initializeSocketServer;
const socket_io_1 = require("socket.io");
function initializeSocketServer(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
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
        socket.on("message-to-room", (room, message) => {
            io.to(room).emit("room-message", message); // שלח הודעה לחדר ספציפי
        });
        //    // שידור לכולם מלבד השולח
        // socket.on('broadcast', (message) => {
        //     socket.broadcast.emit('broadcast-message', message);  // שלח הודעה לכולם מלבד השולח
        //     console.log(`Broadcast message sent:`, message);
        //   });
        // // Acknowledgement example
        // socket.on('request', (data, callback) => {
        //     console.log('Request received', data);
        //     callback({ status: 'OK' });  // Acknowledge the request
        //   });
        socket.on("disconnect", (reason) => {
            console.log("A user disconnected", socket.id, "reason:", reason);
        });
    });
    return io;
}
