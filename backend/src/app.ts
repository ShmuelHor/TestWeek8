import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import connectDb from "./config/db";
import router from "./routes/Router";
import { initializeSocketServer } from "./socket";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

connectDb();

const io = initializeSocketServer(httpServer);

app.use("/api", router);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
