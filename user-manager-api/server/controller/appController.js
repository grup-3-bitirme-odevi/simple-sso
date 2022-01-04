const db = require("../model");
const sha256 = require("js-sha256");
const bcrypt = require("bcrypt");

const User = db.user;

// Request: (username, user_name, user_surname, user_password, user_email, user_type, pass_hash)
// Response: If success, (success, user credentials) / else (fail)
exports.createUser = async (req, res) => {
  // User params catching from req
  const {
    username,
    user_name,
    user_surname,
    user_password,
    user_email,
    user_type,
    pass_hash,
  } = req.body;

  // Assign incoming password to parameter, to use later
  let getPassword = user_password;

  // Check pass_hash parameter
  if (pass_hash == null && pass_hash == undefined) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  // Check User Create params
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

  // If there is user params, check username
  const checkUsername = await User.findOne({ where: { username: username } });
  // If there is user params, check user email
  const checkEmail = await User.findOne({ where: { user_email: user_email } });

  // Check username if exists
  if (checkUsername) {
    return res.status(409).json({
      stat: "fail",
      message: "Username exists in the system.",
    });
  }

  // Check user email if exists
  if (checkEmail) {
    return res.status(409).json({
      stat: "fail",
      message: "Email exists in the system.",
    });
  }

  // Check pass_hash params (true or false)
  if (pass_hash) {
    getPassword = sha256(getPassword + process.env.ENV_PASS_SALT);
  }

  // Encrypt user password
  const encryptedPassword = await bcrypt.hash(getPassword, 10);

  // Call createUser Stored Procedure
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
      // If user created, return success
      return res.status(201).json({
        stat: "success",
        message: data,
      });
    })
    .catch((err) => {
      // Else, return fail
      return res.status(409).json({
        stat: "fail",
      });
    });
};

// Request: (user_id)
// Response: If success, (success) / else (fail)
exports.deleteUser = async (req, res) => {
  const { user_id } = req.params;

  // If there is user_id, check user
  const user = await User.findOne({ where: { id: user_id } });

  // If user not found
  if (!user) {
    return res.status(409).json({
      stat: "fail",
      message: "User not found.",
    });
  }

  // If user try to delete himself.
  if (user_id == req._user.id) {
    return res.status(409).json({
      stat: "fail",
      message: "You cannot delete yourself.",
    });
  }

  // Call deleteUser Stored Procedure
  await db.sequelize
    .query("CALL deleteUser (:user_id)", {
      replacements: {
        user_id: user_id,
      },
    })
    .then(() => {
      // If user deleted, return success
      return res.status(200).json({
        stat: "success",
        message: "User deleted.",
      });
    })
    .catch((err) => {
      // Else, return fail
      return res.status(409).json({
        stat: "fail",
      });
    });
};

// Request: (user_id, username, user_name, user_surname, user_password, user_email, user_type, pass_hash)
// Response: If success, (success, user credentials) / else (fail)
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

  // Check user_id 
  const user = await User.findOne({ where: { id: user_id } });

  // If user not found
  if (!user) {
    return res.status(409).json({
      stat: "fail",
      message: "User not found.",
    });
  }

  // Check pass_hash parameter
  if (pass_hash == null && pass_hash == undefined) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  // Check User Update params
  if (!(username && user_name && user_surname && user_email && user_type)) {
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required.",
    });
  }

  // Check pass_hash params (true or false)
  if (pass_hash) {
    getPassword = sha256(getPassword + process.env.ENV_PASS_SALT);
  }

  // Encrypt user password
  const encryptedPassword = await bcrypt.hash(getPassword, 10);

  // Call updateUser Stored Procedure
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
      // If user created, return success
      return res.status(201).json({
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
      // Else, return fail
      return res.status(409).json({
        stat: "fail",
      });
    });
};

// Request ()
// Response: If success, (success, user credentials) / else (fail)
exports.getListOfUsers = async (req, res) => {

  // Call getListOfUsers Stored Procedure
  await db.sequelize
    .query("CALL getListOfUsers () ")
    .then((data) => {
      // Return success and user list
      return res.status(200).json({
        stat: "success",
        data: data,
      });
    })
    .catch(() => {
      // Else, return fail
      return res.status(409).json({
        stat: "fail",
      });
    });
};

// Request (Middleware - user_id)
// Response: If success, (success, user credentials) / else (fail)
exports.getUserInfo = async (req, res) => {
  try {
    // User params catching from req
    const { id } = req._user;

    // If there is user params, check user_id
    const user = await User.findOne({ where: { id: id } });

    // If user not found
    if (!user) {
      return res.status(409).json({
        stat: "fail",
        message: "User not found.",
      });
    }

    // If user found
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
    // Catch error
    return res.status(500).json({
      stat: "fail",
      message: err,
    });
  }
};
