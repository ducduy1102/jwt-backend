import {
  createNewRole,
  deleteRole,
  getAllRoles,
} from "../service/roleApiService";
import { updateUser } from "../service/userApiService";

const readRoleController = async (req, res) => {
  try {
    let data = await getAllRoles();

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

// todo
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
    let data = await deleteRole(req.body.id);
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
