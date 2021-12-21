module.exports = async (req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    console.log(fullUrl)
       

    return next();
}
