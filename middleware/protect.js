import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../modal/userModal.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization denied.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    req.userId = decoded.id;

    const findUser = await User.findById(decoded.id);

    if(!findUser){
      return res.status(401).json({
        success: false,
        message: "Access denied.",
      });
    }
    req.user = findUser;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired.",
    });
  }
};
