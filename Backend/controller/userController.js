const getAllUsers = async (req, res) => {
    res.send("All users fetched successfully");
};

const signup = (req, res) => {
    res.send("User signed up successfully");
};

const login = (req, res) => {
    res.send("User login successfully");
};

const getUserProfile = (req, res) => {
    res.send("User profile fetched successfully");
};

const updateUserProfile = (req, res) => {
    res.send("User profile updated successfully");
};

const deleteUser = (req, res) => {
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
