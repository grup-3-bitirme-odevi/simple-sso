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
        date.setMinutes(date.getMinutes()+1);

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

exports.IsAccessTokenValid = async(req, res) => {
    const reqToken = req.body.token;
    const reqURL = req.body.url;
    const reqIP = '127.0.0.1';
    const date = new Date(Date.now());

    console.log(reqURL)

    if(!reqToken){
        return res.json({
            "message":"token yok"
        });
    }

    const getToken = await Token.findAll({where: {ip:reqIP, url:reqURL, token: reqToken}});
    if(getToken.length<=0){
        return res.json({
            "message":"fail"
        });
    }

    const getTokenObj = { ...getToken }
    const getTokenId = getTokenObj[0].id;
    const getTokenTTL = getTokenObj[0].ttl;

    const tokenTTL = new Date(getTokenTTL);
    console.log(date);
    console.log(tokenTTL);
    if(date>tokenTTL){
        await Token.destroy({ where: { token: reqToken }});
        return res.json({
            "message":"fail"
        });
    } else{
        const access_token = uuidv4();
        await Token.update({ token: access_token },{ where: {id:getTokenId} });
        return res.json({
            "message":"success",
            "access_token":access_token
        })
    }

}

exports.CheckUrl = async(req, res) => {
    const url = req.body.url;

    if(!url){
        return res.json({
            "message":"fail"
        });
    }
    
    const checkUrl = await Url.findOne({ where: { url:url } });

    if(!checkUrl){
        return res.json({
            "message":"fail"
        })
    }

    return res.json({
        "message":"success"
    })
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

