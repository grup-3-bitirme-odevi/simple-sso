const axios = require('axios');

module.exports = async (req, res, next) => {
    const reqAuthorization = req.headers['authorization'];
    const bearerTag = reqAuthorization && reqAuthorization.split(' ')[0];
    const token = reqAuthorization && reqAuthorization.split(' ')[1];

    if(!reqAuthorization){
        return res.json({
            "message":"fail"
        })
    }
    
    if(bearerTag!="Bearer"){
        return res.json({
            "message":"fail"
        })
    }

    const isValid = await axios.post('http://localhost:3100/validate',{
        token: token
    });
    
    if(isValid.data.message == "fail"){
        return res.json({
            "message":"fail"
        })
    }

    return next();
}
