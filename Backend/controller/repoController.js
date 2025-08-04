const createRepository = (req, res) => {
    res.send("Respository created successfully");
};

const getAllRespositories = (req, res) => {
    res.send("All repositories fetched successfully");
};

const fetchRespositoryById = (req, res) => {
    res.send("Repository fetched successfully");
};

const fetchRespositoryForCurrentUser = (req, res) => {
    res.send("Repository for current user fetched successfully");
};

const updateRepository = (req, res) => {
    res.send("Repository updated successfully");
};

const toggleVisibilityById = (req, res) => {
    res.send("Repository visibility toggled successfully");
};

const deleteRepository = (req, res) => {
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
