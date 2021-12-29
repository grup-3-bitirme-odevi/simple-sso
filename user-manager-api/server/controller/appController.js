const db = require("../model");
const sha256 = require("js-sha256");
const bcrypt = require("bcrypt");

const User = db.user;

exports.createUser = async (req, res) => {
  const {
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
    pass_hash,
  } = req.body;
  let getPassword = user_password;

  if (pass_hash == null && pass_hash == undefined) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  if (
    !(
      username &&
      user_name &&
      user_surname &&
      user_password &&
      user_email &&
      user_type
    )
  ) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  const checkUsername = await User.findOne({ where: { username: username } });
  const checkEmail = await User.findOne({ where: { user_email: user_email } });

  if (checkUsername) {
    return res.status(409).json({
      stat: "fail",
      message: "Username exists in the system.",
    });
  }

  if (checkEmail) {
    return res.status(409).json({
      stat: "fail",
      message: "Email exists in the system.",
    });
  }

  if (pass_hash) {
    getPassword = sha256(getPassword + process.env.ENV_PASS_SALT);
  }

  const encryptedPassword = await bcrypt.hash(getPassword, 10);

  await db.sequelize
    .query(
      "CALL createUser (:username, :user_name, :user_surname, :user_password, :user_email, :user_type)",
      {
        replacements: {
          username: username.toLowerCase(),
          user_name: user_name.toLowerCase(),
          user_surname: user_surname.toLowerCase(),
          user_password: encryptedPassword,
          user_email: user_email.toLowerCase(),
          user_type: user_type.toLowerCase(),
        },
      }
    )
    .then((data) => {
      return res.status(201).json({
        stat: "success",
        message: data,
      });
    })
    .catch((err) => {
      return res.status(409).json({
        stat: "fail",
      });
    });
};

exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;
  console.log(user_id);

  const user = await User.findOne({ where: { id: user_id } });

  if (!user) {
    return res.status(409).json({
      stat: "fail",
      message: "User not found.",
    });
  }

  if (user_id == req._user.id) {
    return res.status(409).json({
      stat: "fail",
      message: "You cannot delete yourself.",
    });
  }

  await db.sequelize
    .query("CALL deleteUser (:user_id)", {
      replacements: {
        user_id: user_id,
      },
    })
    .then(() => {
      res.status(200).json({
        stat: "success",
        message: "User deleted.",
      });
    })
    .catch((err) => {
      res.status(409).json({
        stat: "fail",
      });
    });
};

exports.updateUser = async (req, res) => {
  const {
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
    pass_hash,
  } = req.body;
  const { user_id } = req.params;
  let getPassword = user_password;

  const user = await User.findOne({ where: { id: user_id } });

  if (!user) {
    return res.status(409).json({
      stat: "fail",
      message: "User not found.",
    });
  }

  if (pass_hash == null && pass_hash == undefined) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  if (!(username && user_name && user_surname && user_email && user_type)) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  if (pass_hash) {
    getPassword = sha256(getPassword + process.env.ENV_PASS_SALT);
  }

  const encryptedPassword = await bcrypt.hash(getPassword, 10);

  await db.sequelize
    .query(
      "CALL updateUser (:user_id, :username, :user_name, :user_surname, :user_password, :user_email, :user_type)",
      {
        replacements: {
          user_id: user_id,
          username: username.toLowerCase(),
          user_name: user_name.toLowerCase(),
          user_surname: user_surname.toLowerCase(),
          user_password: encryptedPassword,
          user_email: user_email.toLowerCase(),
          user_type: user_type.toLowerCase(),
        },
      }
    )
    .then(() => {
      res.status(201).json({
        stat: "success",
        message: {
          username: username,
          user_name: user_name,
          user_surname: user_surname,
          user_email: user_email,
          user_type: user_type,
        },
      });
    })
    .catch(() => {
      res.status(409).json({
        stat: "fail",
      });
    });
};

exports.getListOfUsers = async (req, res) => {
  await db.sequelize
    .query("CALL getListOfUsers () ")
    .then((data) => {
      res.status(200).json({
        stat: "success",
        data: data,
      });
    })
    .catch(() => {
      res.status(409).json({
        stat: "fail",
      });
    });
};

exports.getUserInfo = async (req, res) => {
  try {
    const { id } = req._user;
    const user = await User.findOne({ where: { id: id } });

    if (!user) {
      return res.status(409).json({
        stat: "fail",
        message: "User not found.",
      });
    }

    return res.status(200).json({
      stat: "success",
      data: {
        id: user.id,
        username: user.username,
        user_name: user.user_name,
        user_surname: user.user_surname,
        user_email: user.user_email,
        user_type: user.user_type,
      },
    });
  } catch (err) {
    return res.status(500).json({
      stat: "fail",
      message: err,
    });
  }
};
