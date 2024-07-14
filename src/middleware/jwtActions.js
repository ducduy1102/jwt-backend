import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/", "/login", "/register"];

const createJWT = (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;

  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    // show error
    console.log(error);
  }
  return decoded;
};

const checkUserJwt = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        errorCode: -1,
        data: "",
        message: "Not authenticated the user",
      });
    }

    req.token = token;
    req.user = decoded;
    next();
  } else {
    return res.status(401).json({
      errorCode: -1,
      data: "",
      message: "Not authenticated the user",
    });
  }
  console.log(cookies);
};

const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next();

  if (req.user) {
    let email = req.user.email;
    let roles = req.user.groupWithRoles;
    let currentUrl = req.path;

    if (!roles || roles.length === 0) {
      return res.status(403).json({
        errorCode: -1,
        data: "",
        message: "You don't have permission to access this resource...",
      });
    }

    let canAccess = roles.some((item) => item.Roles.url === currentUrl);

    if (canAccess) {
      next();
    } else {
      return res.status(403).json({
        errorCode: -1,
        data: "",
        message: "You don't have permission to access this resource...",
      });
    }
  } else {
    return res.status(401).json({
      errorCode: -1,
      data: "",
      message: "Not authenticated the user",
    });
  }
};

export { createJWT, verifyToken, checkUserJwt, checkUserPermission };
