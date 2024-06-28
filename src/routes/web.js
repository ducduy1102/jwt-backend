import express from "express";
import { handleHelloWord, handleUserPage } from "../controllers/homeController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  // path, handler
  router.get("/", handleHelloWord);
  router.get("/user", handleUserPage);
  return app.use("/", router);
};

export default initWebRoutes;
