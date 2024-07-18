import db from "../models";

const createNewRole = async (roles) => {
  try {
    let currentRole = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persists = roles.filter(
      ({ url: url1 }) => !currentRole.some(({ url: url2 }) => url1 === url2)
    );

    if (persists.length === 0) {
      return {
        message: "Nothing to create...",
        errorCode: 0,
        data: [],
      };
    }

    await db.Role.bulkCreate(persists);

    return {
      message: `Create ${persists.length} roles successfully!`,
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

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      order: [["id", "ASC"]],
    });
    return {
      message: "Get all roles successfully!",
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

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
    }
    return {
      message: "Delete role successfully!",
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

export { createNewRole, deleteRole, getAllRoles };
