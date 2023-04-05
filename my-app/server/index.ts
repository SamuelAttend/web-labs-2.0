import express, { Request, Response } from "express";
import next from "next";
import NextCors from "nextjs-cors";
import mongoose from "mongoose";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const server = express();
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const dbConfig = require("./config/db.config");
const db = require("./models");

server.use(express.json());

const User = db.user;
const initial = () => {
    User.estimatedDocumentCount().then((result: number, error: any) => {
        console.log("There are", result, "users");
        if (!error && result == 0) {
            new User({
                username: "Admin",
                nickname: "Admin",
                email: "Admin",
                password: "root",
            })
                .save()
                .then((result: number, error: any) => {
                    if (error) {
                        console.log("Admin creation fail: ", error);
                    } else {
                        console.log("Admin creation success: ", result);
                    }
                });
        }
    });
};

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("DB connection success");
        initial();
    })
    .catch((err: any) => {
        console.log("DB connection fail");
        console.log(err);
        process.exit();
    });

// (async () => {
//     try {
//         await app.prepare();
//         const server = express();
//         server.all("*", (req: Request, res: Response) => {
//             return res.send("Hello, World!");
//             //return handle(req, res);
//         });
//         server.listen(port, (err?: any) => {
//             if (err) throw err;
//             console.log(
//                 `> Ready on localhost:${port} - env ${process.env.NODE_ENV}`
//             );
//         });
//     } catch (e) {
//         console.error(e);
//         process.exit(1);
//     }
// })();
