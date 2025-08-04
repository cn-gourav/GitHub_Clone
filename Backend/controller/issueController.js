const createIssue = (req, res) => {
    res.send("Issue created successfully");
};

const updateIssue = (req, res) => {
    res.send("Issue updated successfully");
};

const deleteIssue = (req, res) => {
    res.send("Issue deleted successfully");
};

const getAllIssues = (req, res) => {
    res.send("All issues fetched successfully");
};

const getIssueById = (req, res) => {
    res.send("Issue Detail fetched successfully");
};

module.exports = {
    createIssue,
    updateIssue,
    deleteIssue,
    getAllIssues,
    getIssueById,
};
