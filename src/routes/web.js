import express from "express";
import {
  handleCreateNewUser,
  handleHelloWord,
  handleUserPage,
} from "../controllers/homeController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  // path, handler
  router.get("/", handleHelloWord);
  router.get("/user", handleUserPage);
  router.post("/users/create-user", handleCreateNewUser);
  return app.use("/", router);
};

export default initWebRoutes;
