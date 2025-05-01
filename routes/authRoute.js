import { Router } from "express";
import {getUserDetailsCtrl, logoutCtrl, userLoginCtrl, userSignupCtrl } from "../controller/userCtrl.js";
import { protect } from "../middleware/protect.js";
const route = Router();


route.post("/login", userLoginCtrl );
route.post("/signup", userSignupCtrl );
route.get("/getUser", protect, getUserDetailsCtrl);
route.post("/logout", protect, logoutCtrl);

export default route;