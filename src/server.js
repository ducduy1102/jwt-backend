import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
// ver before ES6
// require("dotenv").config();
// ver ES6
import "dotenv/config";
import bodyParser from "body-parser";
import configCors from "./config/cors";
// import connection from "./config/connectDB";

const app = express();
const PORT = process.env.PORT || 8080;

// config cors
configCors(app);

// Test connection db
// connection();

// config view engine
configViewEngine(app);

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
  console.log(">>> JWT Backend is running on the port = " + PORT);
});
