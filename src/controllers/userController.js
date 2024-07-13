import {
  getAllUser,
  getUserWithPagination,
  deleteUser,
  createNewUser,
  updateUser,
} from "../service/userApiService";

const readUserController = async (req, res) => {
  try {
    console.log(req.cookies);

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

const createUserController = async (req, res) => {
  try {
    // Validate
    let data = await createNewUser(req.body);
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

const updateUserController = async (req, res) => {
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

const deleteUserController = async (req, res) => {
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
  readUserController,
  createUserController,
  updateUserController,
  deleteUserController,
};
