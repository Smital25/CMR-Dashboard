# CMR-Dashboard

# 💼 SmartCRM – Intelligent Client & Sales Management Dashboard

SmartCRM is a modern, responsive, and intuitive Customer Relationship Management (CRM) web application built to help teams efficiently manage deals, clients, and sales pipelines. It features a drag-and-drop dashboard, role-based access control, analytics visualization, and secure user authentication.

---

## 🚀 Live Preview

> 💡 _Run locally to explore the full experience._

---

## ✨ Features

- 🔐 **User Authentication** – Register/login with role-based access (Admin, Sales, Support)
- 🧠 **Deal Management** – Add, edit, delete, and track deals in real-time
- 📊 **Sales Pipeline (Kanban View)** – Drag-and-drop stages like Lead, Contacted, Proposal, Won, Lost
- 📈 **Analytics Dashboard** – Pie chart visualization for deal stage distribution
- 🧾 **Client Contact Tracking** – Maintain client communication and contact records
- 💬 **Testimonials Section** – Highlights real feedback
- 🌐 **Landing Page** – Includes Hero, Features, How it Works, Testimonials, About, and Contact

---

## 🛠️ Tech Stack

### **Frontend**
- React.js
- React Router
- Redux Toolkit (Auth State)
- Recharts (Charts)
- CSS3 with animations

### **Backend**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)

---

## 📁 Project Structure

smartcrm/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── assets/
│ │ ├── redux/
│ │ ├── api/
│ │ └── App.jsx
├── .env
├── README.md
└── package.json


#Backend setup
npm run dev
#Frontend setup
npm run dev
Frontend runs at: http://localhost:5173
Backend runs at: http://localhost:5000

#.env file
MONGO_URI=mongodb://localhost:27017/smartcrm
JWT_SECRET=your_secret_key
PORT=5000


 #API Endpoints
| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/auth/register | Register new user      |
| POST   | /api/auth/login    | Login existing user    |
| GET    | /api/deals         | Get all deals for user |
| POST   | /api/deals         | Add new deal           |
| PUT    | /api/deals/\:id    | Update deal by ID      |
| DELETE | /api/deals/\:id    | Delete deal by ID      |

