// src/components/TodoApp.js
import React, { useState } from "react";
import { todos } from "../mockData";

const TodoApp = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter todo items based on the search query
  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Search todos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
          fontSize: "16px",
        }}
      />
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
