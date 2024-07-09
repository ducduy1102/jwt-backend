import db from "../models";

const getGroups = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      message: "Get group successfully!",
      errorCode: 0,
      data: data,
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

export { getGroups };
