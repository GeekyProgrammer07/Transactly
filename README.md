# 💸 Transactly – Simple Digital Wallet Web App

Transactly is a full-stack web application that allows users to sign up, log in, view their wallet balance, search for other users, and transfer money between accounts. It is inspired by digital wallet platforms but focuses on core wallet and peer-to-peer transfer features.

<br>

## ✨ Features

- User signup and login with JWT authentication
- View your wallet balance
- Search for other users by name
- Transfer money to other users by username
- Responsive and modern UI built with React and Tailwind CSS

<br>

## 🛠 Tech Stack

### Frontend

- [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
- [Axios](https://axios-http.com/) for API requests
- [React Router](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) for authentication
- [Zod](https://zod.dev/) for input validation

<br>

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB instance (local or cloud)

### 1. Clone the Repository

```sh
git clone https://github.com/GeekyProgrammer07/Transactly.git
cd transactly
```

### 2. Setup Environment Variables

Create a `.env` file in the `server/` directory:

```
MONGODB_CONNECTION_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SERVER_PORT=3000
```

### 3. Install Dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 4. Run the Application

#### Start Backend Server

```sh
cd server
node index.js
```

#### Start Frontend Dev Server

```sh
cd client
npm run dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173).

<br>

## 🧑‍💻 API Endpoints

### User

- `POST /api/v1/user/signup` – Register a new user
- `POST /api/v1/user/signin` – Login and receive JWT
- `PUT /api/v1/user/` – Update user info (requires auth)
- `GET /api/v1/user/bulk` – Search users

### Account

- `GET /api/v1/account/balance` – Get wallet balance (requires auth)
- `POST /api/v1/account/transfer` – Transfer money to another user (requires auth)

---
