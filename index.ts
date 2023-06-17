import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.port;

app.get("/", (req, res) => {
  res.send("Express + Typescript Server running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
