import React, { useState,useEffect } from 'react';
// import { todos as mockTodos } from './mockData';
import axios from 'axios';
import './DashboardPage.css'; // Import CSS file
import { DeleteIcon, SmallAddIcon, EditIcon,CloseIcon} from '@chakra-ui/icons'

const DashboardPage = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState({ title: '', description: '', status: 'Pending' });
  const [loading, setLoading] = useState(true); // Loading state for fetching todos

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token'); // Get JWT token from localStorage
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://localhost:5000/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT token in the request headers
        },
      });
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      // setError('Error fetching todos'); // Set error state
      setLoading(false);
    }
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>; // Display error message
  // }

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
    setEditedTask({ ...task });
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
      <div className='navbar'>
        <h2 className='dashboard' style={{fontFamily : "Lobster"}}><img src= "/logo.png" alt = "" className = "logo"/>Task Master</h2>
        <button className="btn-logout" onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>
      <div className='handletodo'>
        <div class="addTask">
          <h3>Add Task</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
            <input
              id="taskTitle"
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              id="taskDes"
              type="text"
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button type="submit" id="btn-add" style={{}}>Add <SmallAddIcon color={'white'} boxSize={'15px'} /> </button>
          </form>
        </div>

        {/* <h3>Search Tasks</h3> */}
        <input id="search"
          type="text"
          placeholder="Search todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h1>Todo List</h1>
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="todo-item">
            <div>
              {editingTask === todo.id ? (
                <div class = "update">
                  <input
                    className = "updateTask"
                    id = "updateTaskTitle"
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  />
                  <input
                    className = "updateTask"
                    id = "updateTaskDes"
                    type="text"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  />
                  <button className="func-update btn-func" onClick={() => handleUpdateTask(todo.id)}><EditIcon/></button>
                  <button className="func-cancel btn-func" onClick={() => setEditingTask(null)}><CloseIcon boxSize={8}/></button>
                </div>
              ) : (
                <div>
                  <input
                    id="check"
                    type="checkbox"
                    checked={todo.status === 'Completed'}
                    onChange={() => handleCheckboxChange(todo.id)}
                  />
                  <strong>{todo.title}</strong>
                  <p style={{ textDecoration: todo.status === 'Completed' ? 'line-through' : 'none' }}>{todo.description}</p>
                </div>
              )}
            </div>
            <div className="func">
              {!editingTask && (
                <button className="func-edit btn-func" onClick={() => handleEditTask(todo)}><EditIcon /></button>
              )}
              <button className="func-delete btn-func" onClick={() => handleDeleteTask(todo.id)}><DeleteIcon /></button>
              <span id="status" className={`todo-item ${todo.status || "Pending"}`}>Status: {todo.status || "Pending"}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
