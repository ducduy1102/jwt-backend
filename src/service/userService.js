import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

let connection = "";
// Create the connection to database
(async () => {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "jwt",
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

  //   connection.query(
  //     "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
  //     [email, hashPass, username],
  //     function (err, results, fields) {
  //       if (err) {
  //         console.log(err);
  //       }
  //     }
  //   );
  try {
    // Parameterized query to prevent SQL injection
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
  let users = [];

  try {
    // Parameterized query to prevent SQL injection
    const [results, fields] = await connection.query("SELECT * FROM users");
    console.log("Select successfully!");
    console.log(results); // results contains rows returned by server
  } catch (err) {
    console.log("Failed to select user");
    console.log(err);
  }
};

export { createNewUser, getUserList };
