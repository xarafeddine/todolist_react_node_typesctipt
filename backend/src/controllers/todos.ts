import { ErrorRequestHandler, RequestHandler } from "express";
import { Todo } from "../models/todo";
import { addTodo, getTodoList, removeTodo } from "../services/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(new Date().toISOString(), text);
  try {
    addTodo(newTodo);
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  res.status(201).json({ message: "Created the todo.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  const todos = getTodoList();
  res.json({ todos });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) throw new Error("Could not find tidos");

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);
  res.json({ message: "Updated!", updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;

  try {
    removeTodo(todoId);
  } catch (error) {
    return res.status(500).json(error);
  }
  res.json({ message: "Delete!" });
};
