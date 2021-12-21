exports.IsAuthorized = async (req, res) => {
    const user = req.body;
    console.log(user.username)
    console.log(user.password)

    return res.json({
        "username":user.username,
        "password":user.password
    })
}