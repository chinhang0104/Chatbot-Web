# Node.js MVC Chatbot Web Application

This is a **Chatbot Web Application** built with **Node.js** using the **MVC architecture**. It features user authentication and a chat interface that interacts with a Langgraph chatbot backend via RESTful API.

## Features

- User login with username and password (session-based authentication)
- Chat interface with chat history and real-time message exchange
- Integration with Langgraph chatbot API (`http://localhost:8001/generate`)
- MVC architecture for clear separation of concerns
- EJS templating for server-side rendered views
- Session management with `express-session`
- Password hashing with `bcryptjs`

## Project Structure
├── app.js # Main application entry point  
├── controllers/ # Controllers for auth and chat logic  
├── models/ # Data models (User, ChatHistory)  
├── routes/ # Express route definitions  
├── views/ # EJS templates for login, chat, error pages  
├── public/ # Static assets (CSS, JS)  
├── utils/ # API client and helper utilities  
├── middleware/ # Authentication middleware  
├── config/ # Configuration files (e.g., session)  
├── .env # Environment variables  
├── package.json # Project metadata and dependencies  
└── README.md # Project documentation  

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)
- Langgraph chatbot backend running at `http://localhost:8001`

## Installation

1. Clone the repository:
git clone https://github.com/chinhang0104/Chatbot-Web

2. Install dependencies:
```bash
npm install
```

## Running the Application
Start the server:
```bash
npm start
```

Open your browser and navigate to:
http://localhost:3000

Login with your username and password (default user: `admin` / `password`).

## Usage

- After login, you can chat with the Langgraph chatbot.
- Your messages and chatbot replies are saved in chat history.
- Logout anytime using the provided link.








