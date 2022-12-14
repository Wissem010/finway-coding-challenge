"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_1 = require("./socket");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const application = (0, express_1.default)();
const mongUrl = process.env.MONGO_URL;
const port = process.env.PORT;
const httpServer = http_1.default.createServer(application);
new socket_1.ServerSocket(httpServer);
mongoose_1.default
    .connect(mongUrl !== null && mongUrl !== void 0 ? mongUrl : "")
    .then((res) => console.log("connected"))
    .catch((e) => console.log(e));
application.use(express_1.default.urlencoded({ extended: true }));
application.use(express_1.default.json());
application.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
application.get("/ping", (req, res, next) => {
    return res.status(200).json({ hello: "world!" });
});
application.get("/status", (req, res, next) => {
    return res.status(200).json();
});
application.use((req, res, next) => {
    const error = new Error("Not found");
    res.status(404).json({
        message: error.message,
    });
});
/** Listen */
httpServer.listen(port, () => console.info(`Server is running`));
