import express from "express";
import {
  handleRegister,
  handleLogin,
  testApi,
} from "../controllers/apiController";
import {
  createUser,
  deleteUserController,
  readUserController,
  updateUser,
} from "../controllers/userController";

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
  router.post("/user/create", createUser);
  router.put("/user/update", updateUser);
  router.delete("/user/delete", deleteUserController);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
