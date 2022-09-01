"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", 'true');
//     next();
// });
app.use((0, body_parser_1.json)());
app.use("/api/todos", todos_1.default);
// for production
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../", "../", "frontend", "build", "index.html"));
});
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(5000, () => {
    console.log(path_1.default.resolve(__dirname, "../", "../", "frontend", "build", "index.html"));
    console.log("server up runing on port 5000");
});
