import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkEmailExist = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });

  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExist = async (userPhone) => {
  let user = await db.User.findOne({
    where: { phone: userPhone },
  });

  if (user) {
    return true;
  }
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email/phone number are exist
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true)
      return {
        message: "Email is already exists",
        errorCode: 1,
      };

    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true)
      return {
        message: "Phone number is already exists",
        errorCode: 1,
      };

    // hash user password
    let hashPass = hashUserPassword(rawUserData.password);

    // create new user
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hashPass,
      phone: rawUserData.phone,
    });
    return {
      message: "A user is created successfully!",
      errorCode: 0,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs in service..",
      errorCode: -2,
    };
  }
};

export { registerNewUser };
