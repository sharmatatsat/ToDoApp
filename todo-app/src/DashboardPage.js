import React, { useState } from 'react';
import { todos as mockTodos } from './mockData';
import './DashboardPage.css'; // Import CSS file
import { DeleteIcon, AddIcon, EditIcon } from '@chakra-ui/icons'

const DashboardPage = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState(mockTodos);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', status: 'Pending' });

  const handleAddTask = () => {
    if (newTask.title.trim() === '') {
      alert('Please enter a task title.');
      return;
    }

    const updatedTodos = [...todos, { ...newTask, id: todos.length + 1 }];
    setTodos(updatedTodos);
    setNewTask({ title: '', description: '', status: 'Pending' });
  };

  const handleDeleteTask = (taskId) => {
    const updatedTodos = todos.filter(todo => todo.id !== taskId);
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTodos = todos.map(todo =>
      todo.id === taskId ? { ...todo, status: todo.status === 'Completed' ? 'Pending' : 'Completed' } : todo
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
    setEditedTask({ title: '', description: '', status: 'Pending' });
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
            <div>
              <input id = "check"
                type="checkbox"
                checked={todo.status === 'Completed'}
                onChange={() => handleCheckboxChange(todo.id)}
              />
              <strong>{todo.title}</strong>
              <p style={{ textDecoration: todo.status === 'Completed' ? 'line-through' : 'none' }}>{todo.description}</p>
            </div>
            <div className = "func">
              <button  className = "func-update btn-func"onClick={() => handleEditTask(todo)}><EditIcon /></button>
              <button className = "func-delete btn-func" onClick={() => handleDeleteTask(todo.id)}><DeleteIcon/></button>
              <span id ="status">Status: {todo.status || "Pending"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
