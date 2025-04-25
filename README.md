
# 💼 Job Portal Application

A full-stack job portal web application built using **Spring Boot** for the backend and **React.js** for the frontend.

---

## 📁 Project Structure

```
job-portal/
├── backend/           # Spring Boot backend (Maven project)
├── frontend/          # React frontend
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Java 17+ and Maven installed
- Node.js and npm installed

---

## ⚙️ Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```

3. Default Port: `http://localhost:8080`

---

## 🌐 Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

4. App will be available at: `http://localhost:3000`

---

## ✨ Features

- 📝 Add Jobs
- 🔍 View Job Listings
- 🏢 Company Info & Reviews
- 📦 RESTful API with Spring Boot
- 🎨 Interactive UI with React

---

## 🌍 Technologies Used

### Backend:
- Java 17
- Spring Boot
- Spring Data JPA
- H2 / MySQL
- Maven

### Frontend:
- React.js
- Axios
- Bootstrap / CSS

---

## 📦 API Endpoints (Sample)

| Method | Endpoint             | Description            |
|--------|----------------------|------------------------|
| GET    | `/jobs`              | Get all jobs           |
| POST   | `/jobs`              | Add new job            |
| GET    | `/companies`         | Get all companies      |
| POST   | `/companies`         | Add new company        |
| GET    | `/reviews`           | Get all reviews        |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

---

## 📝 License

This project is licensed under the MIT License.
