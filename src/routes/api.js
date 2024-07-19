import express from "express";
import {
  handleRegister,
  handleLogin,
  handleLogout,
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
import {
  createRoleController,
  deleteRoleController,
  readRoleController,
  // updateRoleController,
  getRoleByGroupController,
  assignRoleToGroupController,
} from "../controllers/roleController";

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
  router.post("/logout", handleLogout), router.get("/account", getUserAccount);

  // CRUD user routes
  router.get("/user/read", readUserController);
  router.post("/user/create", createUserController);
  router.put("/user/update", updateUserController);
  router.delete("/user/delete", deleteUserController);

  // roles routes
  router.get("/role/read", readRoleController);
  router.post("/role/create", createRoleController);
  // router.put("/role/update", updateRoleController);
  router.delete("/role/delete", deleteRoleController);
  router.get("/role/by-group/:groupId", getRoleByGroupController);
  router.post("/role/assign-to-group", assignRoleToGroupController);

  // Group routes
  router.get("/group/read", readGroupController);

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
