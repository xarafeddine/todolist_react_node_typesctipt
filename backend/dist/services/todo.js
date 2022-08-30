"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.addTodo = exports.getTodoList = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _filePath = path_1.default.join(process.cwd(), "data", "todoList.json");
const getTodoList = () => {
    const fileData = fs_1.default.readFileSync(_filePath);
    const todoList = JSON.parse(fileData.toString());
    return todoList;
};
exports.getTodoList = getTodoList;
const addTodo = (todo) => {
    const todoList = (0, exports.getTodoList)();
    todoList.push(todo);
    try {
        fs_1.default.writeFileSync(_filePath, JSON.stringify(todoList));
    }
    catch (error) {
        console.log("error todo is not added!");
        throw new Error("error todo is not added!");
    }
};
exports.addTodo = addTodo;
const removeTodo = (todoId) => {
    const todoList = (0, exports.getTodoList)();
    const todoIndex = todoList.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0) {
        console.log("not found");
        throw new Error("todo is not found");
    }
    todoList.splice(todoIndex, 1);
    try {
        fs_1.default.writeFileSync(_filePath, JSON.stringify(todoList));
    }
    catch (error) {
        console.log("error todo is not delered!");
        throw new Error("error todo is not delered!");
    }
};
exports.removeTodo = removeTodo;
// export function buildFeedbackPath() {
//   return path.join(process.cwd(), "data", "feedback.json");
// }
// export function extractFeedback(filePath) {
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData);
//   return data;
// }
// function handler(req, res) {
//   if (req.method === "POST") {
//     const email = req.body.email;
//     const feedbackText = req.body.text;
//     const newFeedback = {
//       id: new Date().toISOString(),
//       email: email,
//       text: feedbackText,
//     };
//     const filePath = buildFeedbackPath();
//     const data = extractFeedback(filePath);
//     data.push(newFeedback);
//     fs.writeFileSync(filePath, JSON.stringify(data));
//     res.status(201).json({ message: "Success", feedback: newFeedback });
//   } else {
//     const filePath = buildFeedbackPath();
//     const data = extractFeedback(filePath);
//     res.status(200).json({ feedback: data });
//   }
// }
// export default handler;
