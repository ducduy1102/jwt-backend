import { createNewUser, getUserList } from "../service/userService";

const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  // model => get data from database
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  // createNewUser(email, password, username);
  // console.log(">>Check request", req.body);
  getUserList();

  return res.send("handleNewUser");
};

module.exports = {
  handleHelloWord,
  handleUserPage,
  handleCreateNewUser,
};
