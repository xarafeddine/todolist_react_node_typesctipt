import fs from "fs";
import path from "path";
import { Todo } from "../models/todo";

const _filePath = path.join(process.cwd(), "data", "todoList.json");

export const getTodoList = () => {
  const fileData = fs.readFileSync(_filePath);
  const todoList = JSON.parse(fileData.toString()) as Todo[];
  return todoList;
};

export const addTodo = (todo: Todo) => {
  const todoList = getTodoList();
  todoList.push(todo);
  try {
    fs.writeFileSync(_filePath, JSON.stringify(todoList));
  } catch (error) {
    console.log("error todo is not added!");
    throw new Error("error todo is not added!");
  }
};

export const removeTodo = (todoId: string) => {
  const todoList = getTodoList();
  const todoIndex = todoList.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    console.log("not found");
    throw new Error("todo is not found");
  }

  todoList.splice(todoIndex, 1);
  try {
    fs.writeFileSync(_filePath, JSON.stringify(todoList));
  } catch (error) {
    console.log("error todo is not delered!");
    throw new Error("error todo is not delered!");
  }
};

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
