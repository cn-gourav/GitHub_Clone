const express = require("express");
const userController = require("../controller/userController.js");
const userRouter = express.Router();

userRouter.get("/allusers", userController.getAllUsers);
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/profile", userController.getUserProfile);
userRouter.put("/updateProfile", userController.updateUserProfile);
userRouter.delete("/deleteProfile", userController.deleteUser);

module.exports = userRouter;
