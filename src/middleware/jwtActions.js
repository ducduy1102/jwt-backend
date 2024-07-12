import jwt from "jsonwebtoken";
require("dotenv").config();

const createJWT = () => {
  let payload = { name: "Evil", address: "Earth" };
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = jwt.sign(payload, key);
    console.log(token);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    // show error
    console.log(error);
  }
  return data;
};

export { createJWT, verifyToken };
