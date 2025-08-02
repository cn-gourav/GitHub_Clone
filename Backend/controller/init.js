const fs = require("fs").promises;
const path = require("path");
function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.resolve((repoPath, "commits"))
    ;
}

module.exports = { initRepo: initRepo };
