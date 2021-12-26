const db = require("../model");
const sha256 = require('js-sha256');
const bcrypt = require('bcrypt');

const User = db.user;

const handleQuery = [
  {name:"users_username_unique", value:"Kullanıcı adı sistemde kayıtlı."},
  {name:"users_user_email_unique", value:"Email sistemde kayıtlı."},
]

exports.createUser = async (req, res) => {
  
  const { username, user_name, user_surname, user_password, user_email, user_type, pass_hash } = req.body;
  let getPassword = user_password;
  const salt="qwe123asd123zxc";

  if(pass_hash == null && pass_hash == undefined){
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required."
    });
  }

  if(!(username && user_name && user_surname && user_password && user_email && user_type)){
    return res.status(409).json({
      "stat":"fail",
      "message":"All inputs are required."
    });
  }

  if(pass_hash){
    getPassword = sha256(getPassword+salt);
  }

  const encryptedPassword = await bcrypt.hash(getPassword,10);

  await db.sequelize
    .query(
      "CALL createUser (:username, :user_name, :user_surname, :user_password, :user_email, :user_type)",
      {
        replacements: {
          username: username,
          user_name: user_name,
          user_surname: user_surname,
          user_password: encryptedPassword,
          user_email: user_email,
          user_type: user_type,
        },
      }
    )
    .then(() => {
      return res.status(201).json({ 
        "stat": "success",
        message: {
          username: username,
          user_name: user_name,
          user_surname: user_surname,
          user_password: encryptedPassword,
          user_email: user_email,
          user_type: user_type
        }
      });
    })
    .catch((err) => {
      let findPath = err.errors.find(o => o.path)
      let obj = handleQuery.find(o => o.name === findPath.path);
      return res.status(500).json({
        stat: "fail" ,
        message: obj.value
      });
    });
};

exports.deleteUser = async (req, res) => {

  const {user_id} = req.params;

  const user = await User.findOne({where: {id:user_id}});

  if(!user){
    return res.status(409).json({
      "stat": "fail",
      "message": "User not found."
    })
  }

  if(user_id == user.id){
    return res.status(409).json({
      "stat": "fail",
      "message": "You cannot delete yourself."
    })
  }

  await db.sequelize
    .query("CALL deleteUser (:user_id)", {
      replacements: {
        user_id: user_id,
      },
    })
    .then(() => {
      res.status(200).json({ 
        "stat": "success" 
      });
    })
    .catch((err) => {
      res.status(500).json({ 
        "stat": "fail"
      });
    });
};

exports.updateUser = async (req, res) => {

  const { username, user_name, user_surname, user_password, user_email, user_type, pass_hash } = req.body;
  const {user_id} = req.params;
  let getPassword = user_password;
  const salt="qwe123asd123zxc";


  const user = await User.findOne({where: {id:user_id}});

  if(!user){
    return res.status(409).json({
      "stat": "fail",
      "message": "User not found"
    })
  }

  if(pass_hash == null && pass_hash == undefined){
    return res.status(409).json({
      stat: "fail",
      message: "All inputs are required."
    });
  }

  if(!(username && user_name && user_surname && user_email && user_type)){
    return res.status(409).json({
      "stat":"fail",
      "message":"All inputs are required."
    });
  }

  if(pass_hash){
    getPassword = sha256(getPassword+salt);
  }

  await db.sequelize
    .query(
      "CALL updateUser (:user_id, :username, :user_name, :user_surname, :user_password, :user_email, :user_type)",
      {
        replacements: {
          user_id: user_id,
          username: req.body.username,
          user_name: req.body.user_name,
          user_surname: req.body.user_surname,
          user_password: req.body.user_password,
          user_email: req.body.user_email,
          user_type: req.body.user_type,
        },
      }
    )
    .then(() => {
      res.status(201).json({
        "stat": "success",
        message: {
          username: username,
          user_name: user_name,
          user_surname: user_surname,
          user_email: user_email,
          user_type: user_type
        }
      });
    })
    .catch(() => {
      res.status(500).json({ 
        stat: "fail"
      });
    });
};

exports.getListOfUsers = async (req, res) => {
  await db.sequelize.query("CALL getListOfUsers () ").then((data) => {
    res.status(200).json({
      "stat": "success",
      "data": data
    });
  }).catch(() => {
    res.status(500).json({ 
      "stat": "fail"
    });
  })
};

exports.getUserInfo = async (req, res) => {
  try{
    const {id} = req._user;
    const user = await User.findOne({where: {id:id}});

    return res.status(200).json({
      "stat":"success",
      "data": {
        id: user.id,
        username: user.username,
        user_name: user.user_name,
        user_surname: user.user_surname,
        user_email: user.user_email,
        user_type: user.user_type
      }
    })
  } catch(err){
    return res.status(500).json({
      "stat": "fail",
      "message": err
    })
  }

}

