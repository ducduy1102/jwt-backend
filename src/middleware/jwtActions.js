import jwt from "jsonwebtoken";
require("dotenv").config();

const nonSecurePaths = ["/", "/login", "/register", "/logout"];

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

const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const checkUserJwt = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next();

  let cookies = req.cookies;
  const tokenFromHeader = extractToken(req);

  if ((cookies && cookies.jwt) || tokenFromHeader) {
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        errorCode: -1,
        data: "",
        message: "Not authenticated the user",
      });
    }
    req.user = decoded;
    req.token = token;
    next();
  } else {
    return res.status(401).json({
      errorCode: -1,
      data: "",
      message: "Not authenticated the user",
    });
  }
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

    let canAccess = roles.some(
      (item) =>
        item.Roles.url === currentUrl || currentUrl.includes(item.Roles.url)
    );

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
