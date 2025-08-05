# 🌾 AgriConnect - Job Portal for Agriculture Sector

AgriConnect is a full-stack web application built with **Spring Boot** and **React.js** to bridge the gap between **farmers** and **farm workers**. Farmers can list agricultural jobs, and farm workers can apply or post their "Open to Work" status.

---

## 📁 Project Structure

```
agri-connect/
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

3. App will be available at: `http://localhost:8080`

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

- 🌱 Farmers can Add and Manage Job Listings
- 🌾 Farm Workers can Search and Apply for Jobs
- 🧑‍🌾 Post "Open to Work" status as a Farm Worker
- 🧑‍💼 Role-Based Authentication (Admin, Farmer, Worker)
- 🏡 Display Company/Farm Info & Reviews
- 🔐 Secure Login with JWT Authentication
- 📦 RESTful API with Spring Boot
- 🎨 Responsive UI with React.js

---

## 🔐 Role-Based Access Control

| Role    | Functionality                                       |
|---------|-----------------------------------------------------|
| Admin   | Manage users, farms, jobs, and reviews              |
| Farmer  | Post and manage job listings                        |
| Worker  | View/apply to jobs, post "Open to Work", submit reviews |

---

## 🌍 Technologies Used

### Backend:
- Java 17
- Spring Boot
- Spring Security (JWT Auth)
- Spring Data JPA
- MySQL / H2
- Maven

### Frontend:
- React.js
- Axios
- Bootstrap / CSS

---

## 📦 Sample API Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/jobs`              | Get all jobs               |
| POST   | `/jobs`              | Add new job (Farmer)       |
| GET    | `/company`           | Get all farms              |
| POST   | `/company`           | Add new farm (Admin)       |
| GET    | `/reviews`           | Get all reviews            |

Explore other APIs in controller classes.

---

## 🤝 Contributing

We welcome community contributions! To get started:

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m 'feat: add your feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request

---

## 🎯 Planned Features

- Separate dashboards for Admin, Farmer, and Worker in the frontend

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📧 Contact

Maintained by [Karan Chire](mailto:chirdekaran262@gmail.com).
