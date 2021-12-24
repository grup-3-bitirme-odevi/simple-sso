const db = require("../model");
const { v4: uuidv4 } = require("uuid");

const User = db.user;
const Url = db.url;
const Token = db.token;

// Request: (username, password)
// Response: If success, (success, user_id, access_token) / else (fail)
exports.IsAuthorized = async (req, res) => {
	// User params catching from req
  const username = req.body.username;
  const password = req.body.password;
  const reqRedirectUrl = req.body.url;

  let textUrl;

		// Check user params
		if(!(username && password && reqRedirectUrl)){
			return res.status(409).json({
				stat: "fail",
				message: "All input are required."
			});
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

		// If user found, password not correct
    if (user.dataValues.user_password != password) {
      return res.status(409).json({
        stat: "fail",
        message: "Password not match.",
      });
    }

    if(user.dataValues.user_type=='admin'){
      const url = await Url.findAll({attributes: ['url'], raw: true});
      const mapUrl = url.map(x =>{ return x.url }).join(", ")
      textUrl = mapUrl;
    } else {
      const url = await Url.findAll({where:{url_type:user.dataValues.user_type},attributes: ['url'], raw: true});
      const mapUrl = url.map(x =>{ return x.url }).join(", ")
      textUrl = mapUrl;
    }

    var regexUrl = new RegExp(reqRedirectUrl, 'g');
    if (!textUrl.match(regexUrl)) {
      return res.status(409).json({
        stat: "fail",
        message: "You are not authorized this url.",
      });
    }

		// If password correct; generate token guid and TTL
    const access_token = uuidv4();
    const date = new Date(Date.now());
    date.setMinutes(date.getMinutes() + 1);

		// Create user token
    await Token.create({
      ip: "127.0.0.1",
      url: textUrl,
      token: access_token,
      ttl: date.toString(),
    });

		// Return success message and token information.
    return res.status(200).json({
      stat: "success",
      message: "Login successfull",
      user_id: user.dataValues.id,
      access_token: access_token,
    });
};

// Request: (token, url, ip) 
// Response: If success, (success, access_token) / else (fail)
exports.IsAccessTokenValid = async (req, res) => {
	// Token params catching from req
  const reqToken = req.body.token || req.headers["authorization"];
  const reqIP = "127.0.0.1";

  console.log(reqToken)

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

		// If there is token params, check token info
    const getToken = await Token.findAll({
      where: { ip: reqIP, token: reqToken },
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
      await Token.destroy({ where: { token: reqToken } });
      return res.status(409).json({
        stat: "fail",
        message: "You are not authorized.",
      });
    } else {
      
      if(req.body.from=="middleware"){
        return res.status(200).json({
          stat: "success"
        });
      }
			// Create new token
      const access_token = uuidv4();
			// Update old token
      await Token.update(
        { token: access_token },
        { where: { id: getTokenId } }
      );
			// If token update, return success and token
      return res.status(200).json({
        stat: "success",
        access_token: access_token,
      });
    }
  } catch (err) {
		// Catch error
    return res.status(500).json({
      err,
    });
  }
};

// Request: (url) 
// Response: If success, (success, access_token) / else (fail)
exports.CheckUrl = async (req, res) => {
	// URL params catching from req
  const url = req.body.url;

  try {
		// Check url params
    if (!url) {
      return res.status(409).json({
        stat: "fail",
        message: "URL input required",
      });
    }

		// If there is token params, check url 
    const checkUrl = await Url.findOne({ where: { url: url } });

		// If is not found
    if (!checkUrl) {
      return res.status(401).json({
        stat: "fail",
        message: "You are not authorized .",
      });
    }

		// If url found, return success
    return res.status(200).json({
      stat: "success",
    });
  } catch (err) {
		// Catch error
    return res.status(500).json({
      err,
    });
  }
};
