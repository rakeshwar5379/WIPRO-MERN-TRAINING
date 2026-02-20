// Generic role-based middleware
// Usage: router.get("/route", verifyToken, roleMiddleware("admin"), handler)

module.exports = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Only '${role}' can access this route.`
      });
    }
    next();
  };
};