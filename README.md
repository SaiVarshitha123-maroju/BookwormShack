
# 📚 BookwormShack

**BookwormShack** is a full-stack vocabulary learning web application designed to enhance language skills through an engaging, gamified experience. Developed as a project from **May 2024 to June 2024**, it delivers fast word searches, instant meanings, and a digital library with interactive features like a "Word of the Day" spinner.

---

📽️ [Watch the demo](https://drive.google.com/file/d/1blDqtLb7-l9l6MJJf_QnqEMitnCaidtt/view?usp=sharing)

## 🚀 Features

- 🔍 **Instant Word Meaning Search** – Quickly find definitions from a fast, responsive database.
- 🎡 **Word of the Day Spinner** – Gamified daily vocabulary learning experience.
- 📘 **Digital Library** – Access to curated vocabulary lists and learning material.
- 🧠 **User Engagement** – Encourages consistent learning through interactivity and ease of use.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js, Express.js | MongoDB |

---

## 📂 Project Structure

```
BookwormShack/
├── client/             # React frontend (if applicable)
├── controllers/        # Route controllers
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── middlewares/        # Auth and error-handling middleware
├── helpers/            # Utility functions
├── config/             # DB and environment setup
├── server.js           # Main server entry point
└── .env                # Environment variables (not tracked in Git)
```

---

## 🔧 Setup Instructions

1. **Clone the repository**  
   ```bash
   git clone https://github.com/SaiVarshitha123-maroju/BookwormShack.git
   cd BookwormShack
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env` file in the root directory and include:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. *(Optional)* If the frontend is inside the `client/` folder, navigate to it and run:
   ```bash
   cd client
   npm install
   npm start
   ```

---

## 📜 License

This project is for educational and demonstration purposes. You are welcome to use and modify it under the terms of the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Made with ❤️ by Sai Varshitha Maroju
