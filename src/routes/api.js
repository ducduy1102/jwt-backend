import express from "express";
import {
  handleRegister,
  handleLogin,
  testApi,
} from "../controllers/apiController";
import {
  createUserController,
  deleteUserController,
  getUserAccount,
  readUserController,
  updateUserController,
} from "../controllers/userController";
import { readGroupController } from "../controllers/groupController";
import { checkUserJwt, checkUserPermission } from "../middleware/jwtActions";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
  // path, handler
  // rest API
  // router.get("/test-api", testApi);

  router.all("*", checkUserJwt, checkUserPermission);

  router.post("/register", handleRegister);
  router.post("/login", handleLogin);
  router.get("/account", getUserAccount);

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
