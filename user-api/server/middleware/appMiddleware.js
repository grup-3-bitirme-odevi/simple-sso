const axios = require('axios');

module.exports = async (req, res, next) => {

    const reqAuthorization = req.headers['authorization'];
    const bearerTag = reqAuthorization && reqAuthorization.split(' ')[0];
    const token = reqAuthorization && reqAuthorization.split(' ')[1];
    console.log(reqAuthorization)
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

    await axios.post('http://localhost:3100/validate',{
        token: token,
        from: 'middleware'
    }).then(response => {
        if(response.data.stat=="success"){
            return next();
        }
    }).catch(error => {
        return res.json({
            "stat":"fail"
        })
    });

    //return next();
}
