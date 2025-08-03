const fs = require("fs").promises;
const path = require("path");
const { promisify } = require("util");
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revert(commitID) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");
    
    try {
        
    } catch (error) {
        console.error("Error reverting commit:", error);
        return;
    }
}

module.exports = { revertRepo: revert };
