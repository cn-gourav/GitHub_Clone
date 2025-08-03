const express = require("express");
const userRouter = require("./user.router.js");
const mainRouter = express.Router();

mainRouter.use(userRouter);

mainRouter.get("/", (req, res) => {
    res.send("Welcome to the Git Server");
});

module.exports = mainRouter;
