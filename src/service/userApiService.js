import db from "../models/index";

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
      message: "Get data success",
      errorCode: 0,
      data: users,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs with server",
      errorCode: 1,
      data: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    await db.User.create({
      where: {},
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    // Not found
    if (!user) {
      return {};
    }
    // update
    user.save({});
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    await db.User.delete({
      where: { id: id },
    });
  } catch (error) {
    console.log(error);
  }
};

export { getAllUser, createNewUser, updateUser, deleteUser };
