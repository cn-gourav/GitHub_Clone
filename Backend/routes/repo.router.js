const express = require("express");
const repoController = require("../controller/repoController");
const repoRouter = express.Router();

repoRouter.post("/repo/create", repoController.createRepository);
repoRouter.get("/repo/all", repoController.getAllRespositories);
repoRouter.get("/repo/:id", repoController.fetchRespositoryById);
repoRouter.get("/profile", repoController.fetchRespositoryForCurrentUser);
repoRouter.put("/repo/update/:id", repoController.updateRepository);
repoRouter.delete("/repo/delete/:id", repoController.deleteRepository);
repoRouter.patch("/repo/toggle/:id", repoController.toggleVisibilityById);

module.exports = repoRouter;
