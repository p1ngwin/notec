import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import PersonController from "./controllers/PersonController";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;

const uri = String(process.env.DATABASE_CONNECTION);

mongoose.connect(uri).then((res) => console.log("Connected to DB!"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/add", PersonController.createPerson)

app.get("/persons", PersonController.getAllPersons)

app.patch("/update", PersonController.updatePerson)

app.delete("/delete", PersonController.deletePerson)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
