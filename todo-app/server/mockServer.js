
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('./jwtMiddleware');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));

// Dummy users data 
const users = [
  { id: 1, username: 'user1', password: 'pass' },
];

const jwtSecret = 'secretcode';


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are valid
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});


app.get('/api/todos', jwtMiddleware, (req, res) => {

  const todos = [
    { id: 1, title: 'Buy groceries', description: 'Buy milk, eggs, and bread', status: 'Pending' },
    
  ];
  res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
