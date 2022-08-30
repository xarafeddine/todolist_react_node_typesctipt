"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const todo_2 = require("../services/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(new Date().toISOString(), text);
    try {
        (0, todo_2.addTodo)(newTodo);
    }
    catch (error) {
        return res.status(500).json({ message: error });
    }
    res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    const todos = (0, todo_2.getTodoList)();
    res.json({ todos });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
    if (todoIndex < 0)
        throw new Error("Could not find tidos");
    TODOS[todoIndex] = new todo_1.Todo(TODOS[todoIndex].id, updatedText);
    res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    try {
        (0, todo_2.removeTodo)(todoId);
    }
    catch (error) {
        return res.status(500).json(error);
    }
    res.json({ message: "Delete!" });
};
exports.deleteTodo = deleteTodo;
