import express from "express";
import {
  handleRegister,
  handleLogin,
  testApi,
} from "../controllers/apiController";
import {
  createUserController,
  deleteUserController,
  readUserController,
  updateUserController,
} from "../controllers/userController";
import { readGroupController } from "../controllers/groupController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  // path, handler
  // rest API
  router.get("/test-api", testApi);
  router.post("/register", handleRegister);
  router.post("/login", handleLogin);

  // CRUD user
  router.get("/user/read", readUserController);
  router.post("/user/create", createUserController);
  router.put("/user/update", updateUserController);
  router.delete("/user/delete", deleteUserController);

  // Group
  router.get("/group/read", readGroupController);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
