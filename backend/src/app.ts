import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db";
import http from 'http';
// import {CreateUser} from "./services/userService"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDb();

app.use(express.json());
app.use(cors());

// CreateUser("aa","12345","IDF","North")

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
