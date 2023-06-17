import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.port;

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Express + Typescript Server running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
