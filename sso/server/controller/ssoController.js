const db = require('../model');
const User = db.user;

exports.addUser = async(req, res) => {
    let info = {
        username:"koray123",
        user_name:"koray",
        user_surname:"sarıoğlu",
        user_password:"123456",
        user_email:"koray@gmail.com",
        user_type:"admin"
    }

    const user = await User.create(info);
    res.status(201).send(user)

}

/*
exports.IsAuthorized = async (req, res) => {
    const userDetail = req.body;
    console.log(userDetail.username)
    console.log(userDetail.password)
    //const project = await User.findOne({ where: { username: 'aslan' } });
    //console.log(project)
    console.log(req.query)


    return res.json({
        "username":user.username,
        "password":user.password
    }); 
}*/