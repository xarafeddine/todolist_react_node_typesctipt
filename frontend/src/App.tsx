import React, { useEffect, useState } from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

const App: React.FC = () => {
  const API_URL = "/api/todos";
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoGetHandler = async () => {
    const res = await fetch(API_URL, {
      method: "GET",
    });
    const data = await res.json();

    console.log(data);
    setTodos(data.todos);
  };

  useEffect(() => {
    todoGetHandler();
  }, []);

  const todoAddHandler = (text: string) => {
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ text: text }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        todoGetHandler();
      })
      .catch((err) => console.log(err));

    // setTodos((prevTodos) => {
    //   return [...prevTodos, { id: Math.random().toString(), text: text }];
    // });
  };

  const todoDeleteHandler = (todoId: string) => {
    fetch(`${API_URL}/${todoId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        todoGetHandler();
      })
      .catch((err) => console.log(err));

    // setTodos((prevTodos) => {
    //   return prevTodos.filter((todo) => todo.id !== todoId);
    // });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
};

export default App;
