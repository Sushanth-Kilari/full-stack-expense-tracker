# Full Stack Web Development - ExpenseWise

Lab repository for the **Full Stack Web Development (FS)** course. Every program in this repo is built around one theme: **ExpenseWise**, a personal expense tracker, growing from a static page (Week 1) to a complete MERN application (Week 5).

## Structure

| Folder | Contents |
|--------|----------|
| `01-observation-and-record/` | Weekly Observation and Record PDFs, source code and output screenshots (Weeks 1-5) |
| `02-topic-wise-practice/` | Practice programs grouped by topic: HTML/CSS, JavaScript, Node/Express, MongoDB, React |
| `03-assignments/` | Assignment problem statements, solutions and screenshots |
| `04-assessments/` | Internal assessment question papers, solutions and output proof |

## Weekly Index

| Week | Topic | ExpenseWise feature |
|------|-------|---------------------|
| 01 | HTML5 and CSS3 | Landing page and "Add Expense" form |
| 02 | JavaScript ES6 and DOM | Expense list with running total, fetch API |
| 03 | Node.js and Express.js | REST API for expenses (in-memory) |
| 04 | MongoDB and Mongoose | `User` model with monthly budget, CRUD controller |
| 05 | Full Stack Integration (MERN) | React UI + Express + MongoDB expense tracker |

## Assignments and Assessments

| Item | Task |
|------|------|
| Assignment 01 | Responsive portfolio page (ExpenseWise dashboard) |
| Assignment 02 | RESTful API service (Expenses API with validation and filters) |
| Internal Assessment 01 | Split Bill Calculator (HTML/CSS/JS + Express) |
| Internal Assessment 02 | Savings Goals tracker (Express + MongoDB + Mongoose) |

## Running the code

- **Weeks 1-2, assignment 1:** open `index.html` in a browser (or use VS Code Live Server).
- **Week 3 / assignment 2:** `cd src && npm install && npm start`
- **Week 4:** needs MongoDB running locally; `npm install mongoose` then require `dbConfig.js` from your server.
- **Week 5:**
  - `cd src/server && cp .env.example .env && npm install && npm start`
  - `cd src/client && npm install && npm run dev`
- **Internal assessment 1:** `cd src && npm install && npm start`, then open http://localhost:3000
- **Internal assessment 2:** `cd src && cp .env.example .env && npm install && npm start` (needs MongoDB), then open http://localhost:5000

## Author

Name: K. Sushanth Sai Krishna  |  Roll No: A24126552152
