
# 💼 Job Portal Application

A full-stack **Job Portal** web application built using **Spring Boot** (backend) and **React.js** (frontend), offering seamless interaction between job seekers and employers.

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

- 📝 Add and Manage Job Listings
- 🔍 Job Search and Filtering
- 📄 Apply to Jobs with Resume & Cover Letter
- 🧑‍💼 Role-Based Authentication (Admin, Recruiter, User)
- 🏢 Company Info & User Reviews
- 🔐 Secure Login with JWT Authentication
- 📦 RESTful API with Spring Boot
- 🎨 Interactive and Responsive UI with React

---

## 🔐 Role-Based Access Control

| Role      | Functionality                                      |
|-----------|----------------------------------------------------|
| Admin     | Manage all users, jobs, and companies              |
| Recruiter | Post jobs, manage their job listings               |
| User      | View and apply to jobs, submit reviews             |

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
| POST   | `/jobs`              | Add new job (Recruiter)    |
| GET    | `/company`           | Get all companies          |
| POST   | `/company`           | Add new company (Admin)    |
| GET    | `/reviews`           | Get all reviews            |
Explore other api in controller class
---

## 🤝 Contributing

We welcome contributions from the community! If you'd like to improve or extend this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📌 Planned Features

- 🎯 Role-based authentication with distinct dashboards for Admin, Recruiter, and Job Seeker in fronted code


## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

Maintained by [Karan Chire](mailto:chirdekaran262@gmail.com). Feel free to reach out with questions or suggestions!
