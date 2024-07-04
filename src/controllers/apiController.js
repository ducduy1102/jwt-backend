import { registerNewUser } from "../service/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  // console.log("call me", req.body);

  try {
    // req.body: email, phone, username, username, password
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        message: "Missing required parameters",
        errorCode: -1,
        data: "",
      });
    }

    if (req.body.password && req.body.password.length < 6) {
      return res.status(200).json({
        message: "Password is at least 6 characters",
        errorCode: -1,
        data: "",
      });
    }

    // service: create user
    let data = await registerNewUser(req.body);

    return res.status(200).json({
      message: data.message,
      errorCode: data.errorCode,
      data: "",
    });
  } catch (e) {
    return res.status(500).json({
      message: "error from server",
      errorCode: -1,
      data: "",
    });
  }
};

export { testApi, handleRegister };
