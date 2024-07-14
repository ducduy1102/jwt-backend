import db from "../models/index";

const getGroupWithRoles = async (user) => {
  let roles = await db.Group.findAll({
    where: { id: user.groupId },
    attributes: ["id", "name", "description"],
    include: {
      model: db.Role,
      attributes: ["id", "url", "description"],
      through: { attributes: [] },
    },
    raw: true,
    nest: true,
  });

  // let roles = await db.Role.findAll({
  //   attributes: ["id", "url", "description"],
  //   include: {
  //     model: db.Group,
  //     where: { id: user.groupId },
  //     attributes: ["id", "name", "description"],
  //     through: { attributes: [] },
  //   },
  //   raw: true,
  //   nest: true,
  // });

  return roles ? roles : {};
};

export { getGroupWithRoles };
