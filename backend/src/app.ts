import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import http from 'http';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDb();

app.use(express.json());
app.use(cors());



server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
