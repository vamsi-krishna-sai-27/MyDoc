import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const dtoken = req.headers.dtoken || req.headers["dtoken"];
    if (!dtoken) {
      return res.json({ success: false, message: "Not Authorized. Login again." });
    }

    const decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ store in req.userId instead of req.body

    next();
  } catch (error) {
    console.log("AuthDoctor Error:", error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authDoctor;
