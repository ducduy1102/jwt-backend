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

const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = (req, res) => {
  // model => get data from database
  return res.render("user.ejs");
};

const handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  // create user
  try {
    // const [results, fields] = await connection.query("SELECT * FROM users");
    const [results, fields] = await connection.query(
      "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
      [email, password, username]
    );
    console.log(results); // results contains rows returned by server
  } catch (err) {
    console.log(err);
  }

  console.log(">>Check request", req.body);
  return res.send("handleNewUser");
};

module.exports = {
  handleHelloWord,
  handleUserPage,
  handleCreateNewUser,
};
