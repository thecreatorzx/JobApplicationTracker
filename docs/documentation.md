# Job Application Tracker Documentation

## Overview

The **Job Application Tracker** is a full-stack web application for managing job applications, built for the **Shelfex Full-Stack Internship (Task 4)**. It allows users to:

- Sign up and log in
- Add, view, edit, and delete job applications
- Filter by status
- Sort by application date
- Enjoy a responsive UI
- Experience secure authentication

---

### 🖥️ Frontend

- **Tech Stack**: React, Tailwind CSS, Axios, React Toastify

### 🛠️ Backend

- **Tech Stack**: Node.js, Express, MongoDB (Atlas), Mongoose, Bcrypt, JWT

### 🚀 Deployment

- **Frontend**: Vercel  
  https://job-application-tracker-lake.vercel.app
- **Backend**: Render  
  https://job-tracker.onrender.com

### 📁 Repository Structure

```
job-tracker/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js
│   │   │   ├── JobList.js
│   │   │   ├── JobForm.js
│   │   │   ├── JobDetails.js
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Signup.js
│   │   │   ├── Login.js
│   │   │   └── App.js
│   ├── public/
│   ├── .env
│   └── package.json
├── server/
│   ├── models/
│   │   ├── User.js
│   │   └── Job.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── jobs.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── .gitignore
└── documentation.md
```

---

## 🔧 Setup Instructions

### ✅ Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- GitHub account
- Vercel account
- Render account

---

## 🔙 Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install express cors mongoose bcrypt jsonwebtoken dotenv
   ```

3. Create `.env` file inside `server/`:

   ```
   MONGO_URI=mongodb+srv://jobtracker:securepassword123@cluster0.bsbr3cc.mongodb.net/jobtracker?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   FRONTEND_URL=https://job-application-tracker-lake.vercel.app
   PORT=5000
   ```

   - Replace `MONGO_URI` with your Atlas connection string.
   - Ensure `JWT_SECRET` is 32+ characters long.
   - Change `FRONTEND_URL` to your deployed or local frontend.

4. Start the backend:

   ```bash
   npm start
   ```

   > ✅ Expect: `Connected to MongoDB`, `Server running on port 5000`

---

## 🎨 Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install react react-dom react-router-dom axios react-toastify tailwindcss
   ```

3. Create `.env` file inside `client/`:

   ```
   REACT_APP_API_URL=https://job-tracker.onrender.com
   ```

   - Update with your backend URL or `http://localhost:5000`

4. Start the frontend:

   ```bash
   npm start
   ```

   > ✅ Opens at http://localhost:3000

---

## 🍃 MongoDB Atlas Setup

1. Visit: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (e.g., **Cluster0**)
3. Add database user:
   - **Username**: `jobtracker`
   - **Password**: `securepassword123`
4. Network Access:
   - Allow IP from `0.0.0.0/0`
5. Copy the connection string and paste it in `server/.env`

---

## 📲 Usage Guide

- **Signup**: `/signup` → Email & password → Redirect to `/dashboard`
- **Login**: `/login` → Email & password → Redirect to `/dashboard`
- **Dashboard**:
  - View jobs
  - Filter by: Applied, Interview, Offer, Rejected
  - Sort by application date
- **Add Job**:
  - Fields: Company, Role, Status, Applied Date, Notes
- **Edit/View Job**:
  - URL: `/job/:id`
  - Edit and save
- **Delete Job**:
  - From job list
- **Responsive UI**:
  - Mobile testing at `375px`

---

## 🔌 API Endpoints

### 🛡️ Authentication

#### `POST /api/auth/signup`

**Request:**

```json
{ "email": "test@test.com", "password": "password123" }
```

**Response:**

```json
{ "token": "jwt-token" }
```

#### `POST /api/auth/login`

**Request:**

```json
{ "email": "test@test.com", "password": "password123" }
```

**Response:**

```json
{ "token": "jwt-token" }
```

**Error:**

```json
{ "error": "Invalid credentials" }
```

---

### 📄 Jobs (Require Bearer Token)

#### `GET /api/jobs?status=&sort=<asc|desc>`

**Response:**

```json
[
  {
    "_id": "...",
    "company": "New Corp",
    "role": "Engineer",
    "status": "Applied",
    "appliedDate": "2025-06-22",
    "notes": "Interview"
  }
]
```

#### `GET /api/jobs/:id`

**Response:**

```json
{
  "_id": "...",
  "company": "New Corp",
  ...
}
```

**Error:**

```json
{ "error": "Job not found" }
```

#### `POST /api/jobs`

**Request:**

```json
{
  "company": "New Corp",
  "role": "Engineer",
  "status": "Applied",
  "appliedDate": "2025-06-22",
  "notes": "Interview"
}
```

**Response:**

```json
{ "message": "Job added" }
```

#### `PUT /api/jobs/:id`

**Request:**

```json
{ "company": "Updated Corp", ... }
```

**Response:**

```json
{ "message": "Job updated" }
```

#### `DELETE /api/jobs/:id`

**Response:**

```json
{ "message": "Job deleted" }
```

---

## 🌍 Deployment Instructions

### 🚀 Backend on Render

1. Push `server/` to GitHub repo
2. Login to [Render](https://dashboard.render.com)
3. Create new Web Service:
   - **Repo**: `job-tracker`
   - **Root**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables:

   ```
   MONGO_URI=your_connection_string
   JWT_SECRET=your_secret_key
   FRONTEND_URL=https://job-application-tracker-lake.vercel.app
   PORT=5000
   ```

5. Deploy and check logs for MongoDB connection.

---

### ⚛️ Frontend on Vercel

1. Push `client/` to GitHub repo
2. Login to [Vercel](https://vercel.com)
3. Create new Project:
   - **Repo**: `job-tracker`
   - **Root**: `client`
   - **Framework**: Create React App
4. Add environment variable:

   ```
   REACT_APP_API_URL=https://job-tracker.onrender.com
   ```

5. Deploy and note the Vercel URL.

---

## ⚙️ CORS Configuration

In `server.js`:

```js
app.use(
  cors({
    origin: "https://job-application-tracker-lake.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
```

---

## 🧪 Testing

### 🔬 Local Testing

```bash
cd server && npm start
cd client && npm start
```

- Test signup, login, CRUD, filters, sorting
- Test mobile responsiveness (`375px`)

### 🌐 Deployed Testing

- Visit: https://job-application-tracker-lake.vercel.app
- Test:
  - Signup/Login
  - Add/Edit/Delete Jobs
  - Error handling
- Verify MongoDB Atlas has collections:
  - `jobtracker.users`
  - `jobtracker.jobs`
- Check for CORS in browser Dev Tools > Network

---

## 🛠️ Troubleshooting

### 🔴 CORS Errors

- Confirm `FRONTEND_URL` on Render matches your Vercel URL
- Reinstall CORS:

  ```bash
  cd server && npm install cors
  ```

- Redeploy backend

### 🔴 MongoDB Connection

- Check your `MONGO_URI`
- Ensure network access in Atlas is `0.0.0.0/0`

### 🔴 Build Failures

- **Render**: Ensure `server/package.json` has:

  ```json
  "start": "node server.js"
  ```

- **Vercel**: Ensure `client/package.json` has:

  ```json
  "build": "react-scripts build"
  ```

---

## 🚧 Future Improvements

- Add password reset functionality
- Add job application status notifications
- Improve filtering with date ranges
- Add user profile management

---

## 🎥 Demo Video

A demo has been recorded showing:

- Signup / Login
- Add / Edit / Delete Jobs
- Filters / Sorting
- Error Handling
- Mobile View

📌 Link: _[video link here]_

---

## 📤 Submission

- **GitHub Repo**: https://github.com/thecreatorzx/JobApplicationTracker/
- **Frontend**: https://job-application-tracker-lake.vercel.app
- **Backend**: https://jobapplicationtracker-klmi.onrender.com
- **Email**: the0brand0ambassador@gmail.com
