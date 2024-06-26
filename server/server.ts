import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import {
  appointmetsUrl,
  expensesUrl,
  personsUrl,
  revenueUrl,
  serviceUrl,
} from "./utils/api/apiUrls";
import personsRoutes from "./routes/persons/routes";
import appointmentsRoutes from "./routes/appointments/routes";
import serviceRoutes from "./routes/services/routes";
import expensesRoutes from "./routes/expenses/routes";
import revenueRoutes from "./routes/revenue/routes";
import firebaseAdmin from "firebase-admin";
import { validateToken } from "./utils/helpers/token";
const cors = require("cors");

dotenv.config();

const firebaseConfig = JSON.parse(process.env.FIREBASE_CREDENTIALS || "");

if(!firebaseConfig) {
  throw new Error("Missing Firebase credentials");
}

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    ...firebaseConfig, 
    privateKey
  })
});

const app: Express = express();
app.use(express.json());
app.use(cors());

const defaultPort = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 8000;
const env = process.env.ENVIRONMENT;
const port = env !== "local" ? defaultPort : 8000;

const uri = String(process.env.DATABASE_CONNECTION);

mongoose.set("strictQuery", true);

const options: ConnectOptions = {
  autoIndex: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  bufferCommands: true,
  dbName: process.env.DATABASE_NAME || "notec"
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(express.json());

app.use(validateToken);

app.use(`${personsUrl()}`, personsRoutes);

app.use(`${appointmetsUrl()}`, appointmentsRoutes);

app.use(`${serviceUrl()}`, serviceRoutes);

app.use(`${expensesUrl()}`, expensesRoutes);

app.use(`${revenueUrl()}`, revenueRoutes);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
