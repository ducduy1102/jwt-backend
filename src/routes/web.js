import express from "express";
import {
  handleCreateNewUser,
  handleHelloWord,
  handleUserPage,
  handleDeleteUser,
  handleUpdateUser,
  getUpdateUserPage,
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
  router.post("/delete-user/:id", handleDeleteUser);
  router.get("/update-user/:id", getUpdateUserPage);
  router.post("/user/update-user", handleUpdateUser);
  return app.use("/", router);
};

export default initWebRoutes;
