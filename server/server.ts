import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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

let firebaseConfig;

const environment = process.env.NODE_ENV;

if(environment === 'production' || environment === 'development') {
  firebaseConfig = {
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id:  process.env.PRIVATE_KEY_ID,
    private_key:  JSON.parse(process.env.PRIVATE_KEY || ""),
    client_email:  process.env.CLIENT_EMAIL,
    client_id:  process.env.CLIENT_ID,
    auth_uri:  process.env.AUTH_URI,
    token_uri:  process.env.TOKEN_URI,
    auth_provider_x509_cert_url:  process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:  process.env.CLIENT_X509_CERT_URL,
    universe_domain:  process.env.UNIVERSE_DOMAIN
  }
}
else {
  firebaseConfig = require("./firebaseAdminSDK.json");
}


firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
});

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());

const defaultPort = process.env.SERVER_PORT
  ? parseInt(process.env.SERVER_PORT, 10)
  : 8000;
const env = process.env.ENVIRONMENT;
const port = env !== "local" ? defaultPort : 8000;

const uri = String(process.env.DB_LOCAL ?? process.env.DATABASE_CONNECTION);

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
