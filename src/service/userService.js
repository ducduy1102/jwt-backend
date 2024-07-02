import bcrypt from "bcryptjs";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  //   console.log("Check hash password", hashPassword);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
    console.log("User created successfully");
  } catch (err) {
    console.log("Failed to create user", err);
  }
};

const getUserList = async () => {
  let users = [];
  users = await db.User.findAll();

  return users;
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({ where: { id: id } });
  return user.get({ plain: true });
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );
};
export { createNewUser, getUserList, deleteUser, getUserById, updateUserInfor };
