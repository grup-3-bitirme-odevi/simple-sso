exports.IsAuthorized = async (req, res) => {
    const user = req.body;
    console.log(user.username)
    console.log(user.password)

    console.log(req.query)

    return res.json({
        "username":user.username,
        "password":user.password
    }); 
}

exports.CheckUrl = async (req, res) => {
    
}