const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");
    const stagingPath = path.join(repoPath, "staging");

    try {
        const commitId = uuidv4();
        const commitDir = path.join(commitsPath, commitId);
        await fs.mkdir(commitDir, { recursive: true });
        const files = await fs.readdir(stagingPath);
        for (const file of files) {
            const srcPath = path.join(stagingPath, file);
            const destPath = path.join(commitDir, file);
            await fs.copyFile(srcPath, destPath);
        }

        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({
                id: commitId,
                message: message,
                timestamp: new Date().toISOString(),
            })
        );

        console.log(
            `Committed files with ID: ${commitId} and message: "${message}"`
        );
    } catch (err) {
        console.error("Error committing files:", err);
    }
}
module.exports = { commitRepo };
