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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
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
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };

    // console.log("check dataa", data);
    return {
      message: "Get data success",
      errorCode: 0,
      data: data,
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

export {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
