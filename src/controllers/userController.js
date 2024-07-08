import { getAllUser, getUserWithPagination } from "../service/userApiService";

const readUser = async (req, res) => {
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

const createUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

const updateUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

const deleteUser = (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

export { readUser, createUser, updateUser, deleteUser };
