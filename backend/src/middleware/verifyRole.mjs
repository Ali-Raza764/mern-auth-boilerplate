export const verifyRole = async (req, res, next) => {
  try {
    console.log(req.userRole);
    if (req.userRole === "user")
      return res.status(401).send({
        message: "User does not have the permission to acces this route",
      });
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
