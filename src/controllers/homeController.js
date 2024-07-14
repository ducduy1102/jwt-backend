import {
  createNewUser,
  deleteUser,
  getUserById,
  getUserList,
  updateUserInfor,
} from "../service/userService";

const handleHelloWord = (req, res) => {
  return res.render("home.ejs");
};

const handleUserPage = async (req, res) => {
  // model => get data from database
  console.log("cookies", req.cookies);

  let userList = await getUserList();
  // console.log("Check user list", userList);
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  createNewUser(email, password, username);
  // console.log(">>Check request", req.body);
  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  // console.log("Check id: ", req.params.id);
  await deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await getUserById(id);
  let userData = {};
  userData = user;
  // console.log("Check user", user);
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  await updateUserInfor(email, username, id);

  return res.redirect("/user");
};

module.exports = {
  handleHelloWord,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  getUpdateUserPage,
};
