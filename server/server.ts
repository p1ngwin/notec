import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { appointmetsUrl, personsUrl } from "./utils/api/apiUrls";
import personsRoutes from "./routes/persons/routes";
import appointmentsRoutes from "./routes/appointments/routes";
dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.SERVER_PORT;

const uri = String(process.env.DATABASE_CONNECTION);

mongoose.connect(uri).then((res) => console.log("Connected to DB!"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Person routes
app.use(`${personsUrl()}`, personsRoutes);

// Person routes
app.use(`${appointmetsUrl()}`, appointmentsRoutes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
