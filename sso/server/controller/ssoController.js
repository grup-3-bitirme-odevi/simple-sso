const db = require('../model');
const { sha256 } = require('js-sha256');
const tokenCreator = require('../config/tokenCreator');
const User = db.user;
const Url = db.url;
const Token = db.token;

exports.IsAuthorized = async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = tokenCreator.makeToken(120);

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

    return res.status(200).json({
        "user_id":user.dataValues.id,
        "access_token":token
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
