import { createNewRole } from "../service/roleApiService";
import { getAllUser, deleteUser, updateUser } from "../service/userApiService";

const readRoleController = async (req, res) => {
  try {
    if (req.query.page & req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      // Thêm "+" convert -> Number
      let data = await getUserWithPagination(+page, +limit);
      // console.log(page, limit);
      return res.status(200).json({
        message: data.message,
        errorCode: data.errorCode,
        data: data.data,
      });
    } else {
      let data = await getAllUser();

      return res.status(200).json({
        message: data.message,
        errorCode: data.errorCode,
        data: data.data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

const createRoleController = async (req, res) => {
  try {
    let data = await createNewRole(req.body);
    return res.status(200).json({
      message: data.message,
      errorCode: data.errorCode,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

const updateRoleController = async (req, res) => {
  try {
    // Validate
    let data = await updateUser(req.body);
    return res.status(200).json({
      message: data.message,
      errorCode: data.errorCode,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

const deleteRoleController = async (req, res) => {
  try {
    let data = await deleteUser(req.body.id);
    return res.status(200).json({
      message: data.message,
      errorCode: data.errorCode,
      data: data.data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

export {
  readRoleController,
  createRoleController,
  updateRoleController,
  deleteRoleController,
};
