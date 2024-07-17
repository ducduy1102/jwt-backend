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

export { createNewRole };
