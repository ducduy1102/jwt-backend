import { getGroups } from "../service/groupService";

const readGroupController = async (req, res) => {
  try {
    let data = await getGroups();
    return res.status(200).json({
      message: data.message,
      errorCode: data.errorCode,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Something wrongs with server",
      errorCode: -1,
      data: [],
    };
  }
};

export { readGroupController };
