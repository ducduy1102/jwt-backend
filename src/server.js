import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
// ver before ES6
// require("dotenv").config();
// ver ES6
import "dotenv/config";
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// Test connection db
// connection();

// config view engine
configViewEngine(app);

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
