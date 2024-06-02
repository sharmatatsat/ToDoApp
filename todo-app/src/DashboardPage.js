import React, { useState } from 'react';
import { todos as mockTodos } from './mockData';
import './DashboardPage.css'

const DashboardPage = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState(mockTodos);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', status: 'pending' });

  const handleAddTask = () => {
    if (newTask.title.trim() === '') {
      alert('Please enter a task title.');
      return;
    }

    const updatedTodos = [...todos, { ...newTask, id: todos.length + 1 }];
    setTodos(updatedTodos);
    setNewTask({ title: '', description: '', status: 'pending' });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTodos = todos.filter(todo => todo.id !== taskId);
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === taskId ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' } : todo
    );
    setTodos(updatedTodos);
  };

  const handleEditTask = (task) => {
    setEditingTask(task.id);
    setEditedTask({ title: task.title, description: task.description, status: task.status });
  };

  const handleUpdateTask = (taskId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === taskId ? { ...todo, ...editedTask } : todo
    );
    setTodos(updatedTodos);
    setEditingTask(null);
    setEditedTask({ title: '', description: '', status: 'pending' });
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
    return (
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
  
        <h3>Add Task</h3>
        <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Task description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
  
        <h3>Search Tasks</h3>
        <input
          type="text"
          placeholder="Search todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
  
        <h3>Todo List</h3>
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className="todo-item">
              {editingTask === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  />
                  <button onClick={() => handleUpdateTask(todo.id)}>Update</button>
                  <button onClick={() => setEditingTask(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <input
                    type="checkbox"
                    checked={todo.status === 'completed'}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                  <strong>{todo.title}</strong>
                  <p style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>
                    {todo.description}
                  </p>
                  <span>Status: {todo.status || "pending"}</span>
                  <button onClick={() => handleEditTask(todo)}>Edit</button>
                  <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default DashboardPage;
