module.exports = (roles) => {
  return (req, res, next) => {
    // Get user information from req_user
    const userRole = req._user.user_type;
    // Check user_type from appRoute
    if (roles.includes(userRole)) {
      // If the roles included appRoute
      return next();
    } else {
      // If the roles not included appRoute
      return res.status(401).json({
        stat: "fail",
        message: "You are not authorized.",
      });
    }
  };
};
