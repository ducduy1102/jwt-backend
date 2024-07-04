import express from "express";
import {
  handleRegister,
  handleLogin,
  testApi,
} from "../controllers/apiController";

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

  return app.use("/api/v1/", router);
};

export default initApiRoutes;
