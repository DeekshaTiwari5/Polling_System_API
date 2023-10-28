# Polling_System_API

A Polling System is a web application that allows users to create and participate in polls. This README provides an overview of the project, how to set it up, and how to use it.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

#polling-system-api/
│
├── config/
│   ├── mongoose.js         # Database configuration
│  
│
├── controllers/
│   ├── questionsController.js # Controllers for managing questions
│   ├── optionsController.js   # Controllers for managing options
│
├── models/
│   ├── Question.js         # Mongoose models for questions
│   ├── Option.js           # Mongoose models for options
│
├── routes/
│   ├── questions.js         # Routes for questions
│   ├── options.js           # Routes for options
│  │
├── public/                # Static files (if serving any)
│
├── node_modules/           # Dependencies (generated, not to be included in version control)
│
├── .gitignore              # Git ignore configuration
├── package.json            # Node.js project file
├── README.md               # Project README file
├── index.js               # Main application file



### Features

- Create and manage polls.
- Add and manage options for each poll.
- Vote on poll options.
- View poll results.
- Delete polls and options.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed.
- MongoDB set up and running.
- Git (optional but recommended for cloning the repository).

npm install
Configure the database connection:

Open config/mongoose.js and update the MongoDB connection URI.
###Usage
Start the server:   npm start
Your server will start at http://localhost:8000 (or a different port if configured).

You can use the provided API endpoints to interact with the Polling System. See API Endpoints for details.

API Endpoints
The following API endpoints are available:

Create a question: POST /questions/create
Get question details: GET /questions/:id
Delete a question: DELETE /questions/delete/:id
Create an option for a question: POST /questions/options/create/:id
Add a vote to an option: POST /questions/options/add_vote/:id
Update an option: PATCH /questions/options/update/:id
Delete an option: DELETE /questions/options/delete/:id
Detailed information on request and response formats can be found in the project's codebase.
