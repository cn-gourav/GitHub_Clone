const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router.js");

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
    const app = express();
    const PORT = process.env.PORT || 3000;
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());

    app.use("/", mainRouter);
    const mongoURI = process.env.MONGO_URI;

    mongoose
        .connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });

    app.use(cors({ origin: "*" }));

    let user = "test";

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            user = userID;
            console.log("=====");
            console.log(user);
            console.log("=====");
            socket.join(user);
        });
    });

    const db = mongoose.connection;
    db.once("open", async () => {
        console.log("CRUD operattions called");
        //CRUD operations
    });

    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
