import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { appointmetsUrl, personsUrl, serviceUrl } from "./utils/api/apiUrls";
import personsRoutes from "./routes/persons/routes";
import appointmentsRoutes from "./routes/appointments/routes";
import serviceRoutes from "./routes/services/routes";

dotenv.config();

const app: Express = express();
app.use(express.json());

const defaultPort = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 3000;
const env = process.env.ENVIRONMENT;
const port = env !== "local" ? defaultPort : 3000;

const uri = String(process.env.DATABASE_CONNECTION);

mongoose.set("strictQuery", true);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
  bufferCommands: true,
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

app.use(`${serviceUrl()}`, serviceRoutes);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
