import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { AddPerson, GetPersons } from "./routes/Person/Person";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

const uri = String(process.env.DATABASE_CONNECTION);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose.connect(uri).then((res) => console.log("Connected to DB!"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/add", (req: Request, res: Response) => {
  res.send(AddPerson());
});

app.get("/persons", (req: Request, res: Response) => {
  res.send(GetPersons());
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
