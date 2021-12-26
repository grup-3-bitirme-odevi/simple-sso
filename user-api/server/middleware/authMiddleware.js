const axios = require("axios");
const db = require("../model");
const User = db.user;
const Token = db.token;

module.exports = async (req, res, next) => {
  const reqAuthorization = req.headers["authorization"];
  const bearerTag = reqAuthorization.split(" ")[0];
  const token = reqAuthorization.split(" ")[1];

  if (!reqAuthorization) {
    return res.json({
      stat: "fail",
      message: "need authorization",
    });
  }

  if (bearerTag != "Bearer") {
    return res.json({
      stat: "fail",
      message: "need bearer token",
    });
  }

  await axios
    .get("http://localhost:3100/validate", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
    .then(async (response) => {
      if (response.data.stat == "success") {
        const getTokenDetail = await Token.findOne({ where: { token: token } });
        const getUser = await User.findOne({
          where: { id: getTokenDetail.user_id },
        });

        let userObj = {
          id: getUser.id,
          user_type: getUser.user_type,
        };

        req._user = userObj;
        return next();
      }
    })
    .catch((error) => {
      return res.json({
        stat: "fail",
        message: error.response.data.message,
      });
    });
};
