import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    let token = req.headers.token;

    // ✅ Support "Authorization: Bearer <token>"
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id || decoded._id; // ensure compatibility
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
