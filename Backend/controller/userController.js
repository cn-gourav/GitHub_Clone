const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.MONGO_URI;
const getAllUsers = async (req, res) => {
    res.send("All users fetched successfully");
};

let client;
async function connectClient() {
    if (!client) {
        (client = new MongoClient(URI)),
            { useNewUrlParser: true, useUnifiedTopology: true };
    }
    await client.connect();
}

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = {
            username,
            email,
            password: hashedPassword,
            repositories: [],
            followedUsers: [],
            starRepos: [],
        };
        const result = await usersCollection.insertOne(newUser);
        const token = jwt.sign(
            { id: result.insertedId },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ token, userID: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getUserProfile = async (req, res) => {};

const updateUserProfile = async (req, res) => {
    res.send("User profile updated successfully");
};

const deleteUser = async (req, res) => {
    res.send("User deleted successfully");
};

module.exports = {
    getAllUsers,
    signup,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUser,
};
