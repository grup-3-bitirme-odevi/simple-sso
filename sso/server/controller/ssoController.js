const db = require("../model");
const { v4: uuidv4 } = require("uuid");
const sha256 = require('js-sha256');
const bcrypt = require('bcrypt');

const User = db.user;
const Url = db.url;
const Token = db.token;

// Request: (username, password)
// Response: If success, (success, user_id, access_token) / else (fail)
exports.IsAuthorized = async (req, res) => {
  // User params catching from req
  const {redirectURL} = req.query;
  const {username, password, pass_hash} = req.body;
  let getPassword = password;
  const reqIp = "127.0.0.1";
  const salt="qwe123asd123zxc";

  try {
    let textUrl;

    if(!redirectURL){
      return res.status(409).json({
        stat: "fail",
        message: "Redirect URL is reqiured."
      })
    }

    if(pass_hash == null && pass_hash == undefined){
      return res.status(409).json({
        stat: "fail",
        message: "All inputs are required.",
      });
    }

    // Check user params
    if (!(username && password)) {
      return res.status(409).json({
        stat: "fail",
        message: "All inputs are required.",
      });
    }

    if(pass_hash){
      getPassword = sha256(getPassword+salt);
    }
    
    // If there is user params, check user info
    const user = await User.findOne({ where: { username: username } });

    // If is not found
    if (!user) {
      return res.status(409).json({
        stat: "fail",
        message: "User not found.",
      });
    }
    
    const decryptedPassword = await bcrypt.compare(getPassword, user.user_password)

    // If user found, password not correct
    if (!decryptedPassword) {
      return res.status(409).json({
        stat: "fail",
        message: "Password not match.",
      });
    }

    if (user.dataValues.user_type == "admin") {
      const url = await Url.findAll({ attributes: ["url"], raw: true });
      const mapUrl = url
        .map((x) => {
          return x.url;
        })
        .join(", ");
      textUrl = mapUrl;
    } else {
      const url = await Url.findAll({
        where: { url_type: user.dataValues.user_type },
        attributes: ["url"],
        raw: true,
      });
      const mapUrl = url
        .map((x) => {
          return x.url;
        })
        .join(", ");
      textUrl = mapUrl;
    }

    var regexUrl = new RegExp(redirectURL, "g");
    if (!textUrl.match(regexUrl)) {
      return res.status(409).json({
        stat: "fail",
        message: "You are not authorized.",
      });
    }

    // If password correct; generate token guid and TTL
    const access_token = uuidv4();
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 5);

    // Create user token
    await Token.create({
      ip: reqIp,
      url: textUrl,
      token: access_token,
      ttl: date.toString(),
      user_id: user.id
    });

    // Return success message and token information.
    return res.status(200).json({
      stat: "success",
      message: "login success",
      user_id: user.id,
      access_token: access_token,
    });
  } catch (err) {
    return res.status(500).json({
      err,
    });
  }
};

// Request: (token, url, ip)
// Response: If success, (success, access_token) / else (fail)
exports.IsAccessTokenValid = async (req, res) => {
  // Token params catching from req
  const reqToken = req.headers["authorization"];
  const reqIP = "127.0.0.1";

  try {
    // Create now date
    const date = new Date(Date.now());

    // Check token params
    if (!reqToken) {
      return res.status(409).json({
        stat: "fail",
        message: "Token input required.",
      });
    }

    const bearerTag = reqToken.split(" ")[0];
    const token = reqToken.split(" ")[1];
  
    if (bearerTag != "Bearer") {
      return res.json({
        stat: "fail",
        messsage: "Authorization need Bearer Token"
      });
    }

    // If there is token params, check token info
    const getToken = await Token.findAll({
      where: { ip: reqIP, token: token },
    });

    // If is not found
    if (getToken.length <= 0) {
      return res.status(409).json({
        stat: "fail",
        message: "Token not found.",
      });
    }

    // If token found, get id and ttl
    const getTokenObj = { ...getToken };
    const getTokenId = getTokenObj[0].id;
    const getTokenTTL = getTokenObj[0].ttl;
    const tokenTTL = new Date(getTokenTTL);

    // If now date bigger than token TTL
    if (date > tokenTTL) {
      //await Token.destroy({ where: { token: token } });
      return res.status(401).json({
        stat: "fail",
        message: "You are not authorized.",
      });
    } else {
      const date = new Date(Date.now());
      date.setMinutes(date.getMinutes() + 30);

      // Create new token
      await Token.update(
        { ttl: date.toString() },
        { where: { id: getTokenId } }
      );

      // If token update, return success and token
      return res.status(200).json({
        stat: "success"
      });
    }
  } catch (err) {
    // Catch error
    return res.status(500).json({
      err,
    });
  }
};
