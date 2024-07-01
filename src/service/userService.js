import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// create the connection, specify bluebird as Promise
// const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "jwt",
//   Promise: bluebird,
// });

let connection = "";
// Create the connection to database
(async () => {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "jwt",
      Promise: bluebird,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  console.log("Check hash password", hashPassword);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  try {
    const [results, fields] = await connection.query(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPass, username]
    );
    console.log("User created successfully");
  } catch (err) {
    console.log(err);
    console.log("Failed to create user");
  }
};

const getUserList = async () => {
  try {
    const [results, fields] = await connection.execute("SELECT * FROM users");
    // console.log(results); // results contains rows returned by server
    return results;
  } catch (err) {
    console.log("Failed to select user", err);
  }
};

export { createNewUser, getUserList };
