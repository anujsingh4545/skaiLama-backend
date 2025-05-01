import { getUserDetailsService, userLoginService, userSignupService } from "../services/userServices.js";
import { AppError } from "../utils/AppError.js";

export const userSignupCtrl = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new AppError("Email || Password not exists!", 400);
    const { user, token } = await userSignupService(email, password);

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        data: user,
        message: "Account Created Sucessfully!",
      });
  } catch (error) {
    next(error);
  }
};

export const userLoginCtrl = async(req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new AppError("Email || Password not exists!", 400);

    const { user, token } = await userLoginService(email, password);
    
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        data: user,
        message: "Welcome User!",
      });


  } catch (error) {
    next(error);
  }
};

export const getUserDetailsCtrl = async(req,res,next)=>{
  try {
    const data  = await getUserDetailsService(req.userId);
    
    return res.status(201).json({
      success: true,
      data :data,
      message  :"User fetched sucessfully"
    })
    
  } catch (error) {
     next(error);
  }
}

export const logoutCtrl = async(req,res,next)=>{
  try {
    const data  = await getUserDetailsService(req.userId);

    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    
    return res.status(201).json({
      success: true,
      data :data,
      message  :"Logged out sucessfully!"
    })
    
  } catch (error) {
     next(error);
  }
}
