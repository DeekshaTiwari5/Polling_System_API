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

- 
## Folder Structure

The folder structure for the Polling System API is organized as follows:

- **config/**: Configuration files for setting up your application, including database connections and Express configuration.
- **controllers/**: Controllers that handle the business logic of your API, like creating, updating, or deleting questions and options.
- **models/**: Mongoose models that define the structure of your data.
- **routes/**: Express routes that define the API endpoints for your questions and options.
- **public/**: If you have static files (e.g., for serving images or stylesheets), you can place them here.
- **tests/**: Test files and configurations for testing your API.
- **node_modules/**: Automatically generated folder by npm to store project dependencies (should not be included in version control).
- **.gitignore**: Configuration file that specifies which files and folders should be ignored by Git.
- **package.json**: Node.js project file that lists project dependencies and other metadata.
- **README.md**: The documentation file you're currently reading.
- **server.js**: The main entry point of your application.
- ... (other project-specific files and folders)

Please note that the actual folder structure may vary based on the specific requirements and organization of your project.



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

**Create a question: POST /questions/create
**Get question details: GET /questions/:id
**Delete a question: DELETE /questions/delete/:id
**Create an option for a question: POST /questions/options/create/:id
**Add a vote to an option: POST /questions/options/add_vote/:id
**Update an option: PATCH /questions/options/update/:id
**Delete an option: DELETE /questions/options/delete/:id
Detailed information on request and response formats can be found in the project's codebase.
