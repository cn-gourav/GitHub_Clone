const fs = require("fs").promises;
const path = require("path");

const { s3, S3_BUCKET } = require("../config/aws-config");
const { v4: uuidv4 } = require("uuid");
async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".apnaGit");
    const commitsPath = path.join(repoPath, "commits");
    const stagingPath = path.join(repoPath, "staging");

    try {
        const commitDirs = await fs.readdir(commitsPath);
        for (const commitDir of commitDirs) {
            const commitPath = path.join(commitsPath, commitDir);
            const files = await fs.readdir(commitsPath);
            for (const file of files) {
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);

                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commitDir}/${file}`,
                    Body: fileContent,
                };
                await s3.upload(params).promise();
                console.log("All commits pushed to s3 successfully");
            }
        }
    } catch (error) {
        console.error("Error pushing to s3:", error);  
        return;
    }
}

module.exports = { pushRepo: pushRepo };
