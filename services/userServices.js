import User from "../modal/userModal.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../utils/AppError.js";
import bcrypt from "bcryptjs";


export const userLoginService = async (email, password) => {
    try {

      const userExists = await User.findOne({ email }).select("+password"); 
  
      if (!userExists) throw new AppError("Account not found!", 400);
  
      const isMatch = await bcrypt.compare(password, userExists.password);
      if (!isMatch) throw new AppError("Invalid credentials!", 400);
  

      const token = jwt.sign({ id: userExists._id }, process.env.JWTSECRET,{ expiresIn: "7d" });
  
      const userObj = userExists.toObject();
      delete userObj.password;
  
      return { user: userObj, token };
  
    } catch (error) {
      throw error;
    }
  };

export const userSignupService = async(email, password)=>{
    try {
        const userExists = await User.findOne({"email":email});

        if(userExists) throw new AppError("Email Already Exists!", 400);

        const salt = await bcrypt.genSalt(10);
        const encrypt_pass = await bcrypt.hash(password, salt);

        const user = await User.create({email, password: encrypt_pass});
    
        const token = jwt.sign({ id: user?._id }, process.env.JWTSECRET, { expiresIn: "7d"});

        const userObj = user.toObject();
        delete userObj.password;
 
        return {user: userObj, token};

    } catch (error) {
        throw error;
    }
}

export const getUserDetailsService = async(userId)=>{
    try {
        const findUser = await User.findById(userId);

        if(!findUser) throw new AppError("User not found!", 400);

        return findUser;
        
    } catch (error) {
        throw error;
    }
}