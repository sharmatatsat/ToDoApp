ToDo App
This is a simple ToDo application built with React and Express. It supports user authentication using JWT and allows users to create, view, edit, and delete tasks.

Features

User Authentication using JWT (Login)
Create, View, Edit, and Delete Tasks
Search Tasks
Toggle Task Completion Status
2 Main Pages (login , Dashboard)

Technologies Used
React
Express
Axios
JSON Web Token (JWT)
Chakra UI Icons
CSS

Prerequisites
Node.js (v14 or later)
npm or yarn
Installation

Clone the repository
git clone https://github.com/yourusername/todo-app.git
cd todo-app
Install dependencies

For the server:

cd server
npm install

For the client:

cd client
npm install

Setup Environment Variables
Create a .env file in the server directory and add the following:

env

JWT_SECRET=your_jwt_secret

Running the Application
Start the server

In the server directory, run:

node mockServer.js

This will start the server on http://localhost:5000.

Start the client

In the client directory, run:

npm start
This will start the client on http://localhost:3000.

Important Notes
Make sure to replace your_jwt_secret in the .env file with your own secret key.
The server uses a dummy user for authentication. You can modify the user credentials in mockServer.js.
Ensure that CORS is configured correctly to avoid issues when making requests from the client.

