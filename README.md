# Job Application Tracker

A full-stack job application tracking system built for the Shelfex Full-Stack Internship Task.

---

## 🌐 Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, JWT, Nodemailer
- **Deployment**:
  - Frontend: Vercel
  - Backend: Render
- **Database**: MongoDB Atlas

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-application-tracker.git
```

---

### 2. Frontend Setup

```bash
cd client
npm install
npm start
```

---

### 3. Backend Setup

```bash
cd server
npm install
npm start
```

---

### 4. Environment Variables

Create a `.env` file inside the `server/` directory with the following content:

```
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

---

## ✨ Features

- 🔐 User authentication (Signup/Login) with JWT
- 📄 Full CRUD operations for job applications (company, role, status, applied date, notes)
- 🔍 Filter applications by status and sort by applied date
- 📧 Real-time email notifications on job application updates
- 📱 Responsive UI powered by Tailwind CSS

---

## 🌍 Deployment

- **Frontend**: [Deployed on Vercel](#) _(link to be added)_
- **Backend**: [Deployed on Render](#) _(link to be added)_

---

## 📁 Folder Structure (Optional Tip)

Here’s a quick peek into the folder structure you might want to maintain:

```
job-application-tracker/
│
├── client/                 # Frontend React App
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── ...
│
├── server/                 # Backend Express API
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
└── README.md
```

---

## 📌 Tips

- Make sure to secure your `.env` file using `.gitignore`.
- Use tools like [Postman](https://www.postman.com/) for API testing.
- For email features, consider using an app-specific password for Gmail or better yet, switch to a dedicated SMTP service like SendGrid in production.
- Ensure CORS settings are properly configured when connecting frontend and backend during deployment.

---

## 📬 Contact

For any questions or feedback, feel free to open an issue or reach out to [your-email@example.com].
