const db = require('../model');
const { sha256 } = require('js-sha256');
const { v4: uuidv4 } = require('uuid');

const User = db.user;
const Url = db.url;
const Token = db.token;

exports.IsAuthorized = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const reqRedirectUrl = req.body.url;

    try{
        const user = await User.findOne({ where: { username: username } });
        
        if(!user){
            return res.status(403).json({
                "message":"user not found"
            })
        }

        if(user.dataValues.user_password != password){
            return res.status(403).json({
                "message":"password not match"
            })
        }

        const access_token = uuidv4();
        const date = new Date(Date.now());

        await Token.create({
            ip:"127.0.0.1", 
            url: reqRedirectUrl, 
            token: access_token, 
            ttl: date.toString()
        });

        return res.status(200).json({
            "message":"success",
            "user_id":user.dataValues.id,
            "access_token":access_token
        })
    } catch(err){
        return res.json({
            err
        })
    }
}

exports.GetUserInfo = async(req, res) => {
    const {access_token, user_id} = req.body;

    const user = await User.findOne({where: {id: user_id}});

    if(!user){
        return res.status(403).json({
            "message":"user not found"
        })
    }

}

exports.IsAccessTokenValid = async(req, res) => {
    const reqToken = req.body.token;
    const reqRedirectUrl = req.query.redirectURL;
    const ip = "127.0.0.1";
    const date = new Date(Date.now());

    console.log(reqRedirectUrl)

    if(!reqToken){
        return res.json({
            "message":"token yok"
        });
    }

    const getToken = await Token.findOne({where: {token: reqToken}});

    if(!getToken){
        return res.json({
            "message":"fail"
        });
    }

    const tokenTTL = new Date(getToken.dataValues.ttl);

    if(date>tokenTTL){
        return res.json({
            "message":"fail"
        });
    } else{
        return res.json({
            "message":"success"
        })
    }

}