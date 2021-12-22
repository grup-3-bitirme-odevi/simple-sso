const db = require('../model');
const tokenCreator = require('../config/tokenCreator');

const User = db.user;
const Url = db.url;
const Token = db.token;

exports.createUser= async (req,res)=>{
db.sequelize.query('CALL createUser (:username, :user_name, :user_surname, :user_password, :user_email, :user_type)',
          {replacements: { 
        username : req.body.username,
        user_name : req.body.user_name,
        user_surname : req.body.user_surname,
        user_password : req.body.user_password , 
        user_email : req.body.user_email,
        user_type : req.body.user_type,}}).then(()=>{
            res.send({isSuccess: true});
        }).catch(()=>{
            res.send({isSuccess: false}); 
        })  
}
exports.deleteUser=async(req,res)=> {
        db.sequelize.query('CALL `deleteUser` (:user_id)',
          {replacements: { 
            user_id : req.params.user_id,
        }}).then(()=>{
            res.send({isSuccess: true});
        }).catch(()=>{
            res.send({isSuccess: false}); 
        })  
}

exports.updateUser= async (req,res)=>{
    db.sequelize.query('CALL `updateUser` (:user_id, :username, :user_name, :user_surname, :user_password, :user_email, :user_type)',
              {replacements: { 
            user_id : req.params.user_id, 
            username : req.body.username,
            user_name : req.body.user_name,
            user_surname : req.body.user_surname,
            user_password : req.body.user_password , 
            user_email : req.body.user_email,
            user_type : req.body.user_type,}}).then(()=>{
                res.send({isSuccess: true});
            }).catch(()=>{
                res.send({isSuccess: false}); 
            })  
    }

exports.getListOfUsers=async (req,res)=> {

    db.sequelize.query( 'CALL getListOfUsers () ').then(data=>{
        res.send(data)
    })

}