const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controller/init.js");
const { addRepo } = require("./controller/add.js");
const { commitRepo } = require("./controller/commit.js");
const { pushRepo } = require("./controller/push.js");
const { pullRepo } = require("./controller/pull.js");
const { revertRepo } = require("./controller/revert.js");

yargs(hideBin(process.argv))
    .command("start", "Start a new server", {}, startServer)
    .command("init", "Initialize a new repository", {}, initRepo)
    .command(
        "add <file>",
        "add to file to repository",
        (yargs) => {
            yargs.positional("file", {
                describe: "File to add to the staging area",
                type: "string",
            });
        },
        (argv) => {
            addRepo(argv.file);
        }
    )
    .command(
        "commit <message>",
        "commit to file to repository",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit to File the staging area",
                type: "string",
            });
        },
        (argv) => {
            commitRepo(argv.message);
        }
    )
    .command("push", "Push to file to repository", {}, pushRepo)
    .command("pull", "Pull to file to repository", {}, pullRepo)
    .command(
        "revert <commitID>",
        "Revert a specifc commit",
        (yargs) => {
            yargs.positional("commitId", {
                describe: "Comit ID to revert",
                type: "string",
            });
        },
        (argv) => {
            revertRepo(argv.commitId);
        }
    )

    .demandCommand(1, "You need at least one command")
    .help().argv;

function startServer() {
    console.log("Server started successfully!");
}
