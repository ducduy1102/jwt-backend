import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

// let connection = "";
// Create the connection to database, specify bluebird as Promise
// (async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       database: "jwt",
//       Promise: bluebird,
//     });
//     console.log("Database connected successfully");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// })();

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //   console.log("Check hash password", hashPassword);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    await connection.execute(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, hashPass, username]
    );
    console.log("User created successfully");
  } catch (err) {
    console.log("Failed to create user", err);
  }
};

const getUserList = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [results, fields] = await connection.execute("SELECT * FROM users");
    // console.log(results); // results contains rows returned by server
    return results;
  } catch (err) {
    console.log("Failed to select user", err);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [results, fields] = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.log("Failed to select user", err);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [results, fields] = await connection.execute(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return results;
  } catch (error) {
    console.log("Get user failed", error);
  }
};

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [results, fields] = await connection.execute(
      "UPDATE users SET email = ?, username = ? WHERE id =?",
      [email, username, id]
    );
    console.log("Update user infor successfully!");
    return results;
  } catch (error) {
    console.log("Update user infor failed", error);
  }
};

export { createNewUser, getUserList, deleteUser, getUserById, updateUserInfor };
