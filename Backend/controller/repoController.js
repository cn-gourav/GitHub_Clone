const moongoose = require("mongoose");
const Repository = require("../models/repoModels.js");
const Issue = require("../models/issueModels.js");
const { default: mongoose } = require("mongoose");
const createRepository = async (req, res) => {
    const { name, description, owner, issues, content, visibility } = req.body;
    try {
        if (!name) {
            return res.status(400).json({ message: "User ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(owner)) {
            return res.status(400).json({ message: "Invalid owner ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(Issue)) {
            return res.status(400).json({ message: "Invalid issues ID" });
        }

        const repository = new Repository({
            name,
            description,
            owner,
            issues,
            content,
            visibility,
        });

        const result = await repository.save();
        res.status(201).json({
            message: "Repository created successfully",
            repositoryId: result._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllRespositories = async (req, res) => {
    res.send("All repositories fetched successfully");
};



const fetchRespositoryById = async (req, res) => {
    res.send("Repository fetched successfully");
};

const fetchRespositoryForCurrentUser = async (req, res) => {
    res.send("Repository for current user fetched successfully");
};

const updateRepository = async (req, res) => {
    res.send("Repository updated successfully");
};

const toggleVisibilityById = async (req, res) => {
    res.send("Repository visibility toggled successfully");
};

const deleteRepository = async (req, res) => {
    res.send("Repository deleted successfully");
};

module.exports = {
    createRepository,
    getAllRespositories,
    fetchRespositoryById,
    fetchRespositoryForCurrentUser,
    updateRepository,
    toggleVisibilityById,
    deleteRepository,
};
