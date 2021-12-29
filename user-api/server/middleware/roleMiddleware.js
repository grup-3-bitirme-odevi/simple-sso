module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req._user.user_type;
    if (roles.includes(userRole)) {
      return next();
    } else {
      return res.status(401).json({
        stat: "fail",
        message: "You are not authorized.",
      });
    }
  };
};
