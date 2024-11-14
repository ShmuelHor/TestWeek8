"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketServer = initializeSocketServer;
const socket_io_1 = require("socket.io");
const MissilesService_1 = require("./services/MissilesService");
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
        socket.on("message-to-room", (room, message) => __awaiter(this, void 0, void 0, function* () {
            const threats = yield (0, MissilesService_1.SubtractAmmunition)(message.idUser, message.missileName, message.location, message.status);
            io.to(room).emit("room-message", threats); // שלח הודעה לחדר ספציפי
        }));
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
