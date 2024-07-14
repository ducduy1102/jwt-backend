import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashUserPassword,
} from "./loginRegisterService";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (!users) {
      return {
        message: "Get data success",
        errorCode: 0,
        data: [],
      };
    }
    return {
      message: "Get data successfully!",
      errorCode: 0,
      data: users,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs with service",
      errorCode: 1,
      data: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["id", "name", "description"] },
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    // console.log(
    //   "offset = ",
    //   offset,
    //   "count = ",
    //   count,
    //   "limit = ",
    //   limit,
    //   "Total Pages = ",
    //   totalPages,
    //   "page = ",
    //   page
    // );
    let dataPages = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    // console.log("check dataa", data);
    return {
      message: "Get data successfully!",
      errorCode: 0,
      data: dataPages,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs with service",
      errorCode: 1,
      data: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    // check email/phone number are exist
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true)
      return {
        message: "Email is already exist",
        errorCode: 1,
        data: "email",
      };

    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true)
      return {
        message: "Phone number is already exist",
        errorCode: 1,
        data: "phone",
      };

    // hash user password
    let hashPass = hashUserPassword(data.password);

    await db.User.create({ ...data, password: hashPass });
    return {
      message: "Create user successfully!",
      errorCode: 0,
      data: [],
    };
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    if (!data.groupId) {
      return {
        message: "Error with empty GroupId",
        errorCode: 1,
        data: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    // Not found
    if (!user) {
      return {
        message: "User not found",
        errorCode: 2,
        data: "",
      };
    }
    // update
    await user.update({
      username: data.username,
      address: data.address,
      sex: data.sex,
      groupId: data.groupId,
    });

    return {
      message: "Update user successfully!",
      errorCode: 0,
      data: "",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs with service",
      errorCode: 1,
      data: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    // C1
    await db.User.destroy({
      where: {
        id: id,
      },
    });

    // C2
    // let user = await db.User.findOne({
    //   where: { id: id },
    // });
    // if (!user) {
    //   return {
    //     message: "User not exist",
    //     errorCode: 2,
    //     data: [],
    //   };
    // }
    // await user.destroy();
    return {
      message: "Delete user successfully!",
      errorCode: 0,
      data: [],
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs with service",
      errorCode: 1,
      data: [],
    };
  }
};

export {
  getAllUser,
  createNewUser,
  updateUser,
  getUserWithPagination,
  deleteUser,
};
