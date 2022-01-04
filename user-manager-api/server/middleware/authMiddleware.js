require('dotenv').config()
const axios = require("axios");
const db = require("../model");
const User = db.user;
const Token = db.token;

module.exports = async (req, res, next) => {
  // Get Authorization Headers
  const reqAuthorization = req.headers["authorization"];
  // Parse Authorization token
  const bearerTag = reqAuthorization.split(" ")[0];
  const token = reqAuthorization.split(" ")[1];

  // If authorization header is null or empty 
  if (!reqAuthorization) {
    return res.json({
      stat: "fail",
      message: "need authorization",
    });
  }

  // If authorization token not Bearer
  if (bearerTag != "Bearer") {
    return res.json({
      stat: "fail",
      message: "need bearer token",
    });
  }

  // Check token validation
  await axios
    .get(`${process.env.ENV_SSO_SERVER}/validate`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then(async (response) => {
      // If the result is success
      if (response.data.stat == "success") {
        // Get token user_id
        const getTokenDetail = await Token.findOne({ where: { token: token } });
        // Get user from token user_id
        const getUser = await User.findOne({
          where: { id: getTokenDetail.user_id },
        });

        // Create userObj with user information
        let userObj = {
          id: getUser.id,
          user_type: getUser.user_type,
        };

        // Generate req._user with userObj
        req._user = userObj;
        return next();
      }
    })
    .catch((error) => {
      return res.json({
        // If the result is fail
        stat: "fail",
        message: error.response.data.message,
      });
    });
};
