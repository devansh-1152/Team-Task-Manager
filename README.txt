Team Task Manager

Description:
A web application where users can create projects, assign tasks, and track progress with role-based access control.

Features:
- Authentication (Signup/Login)
- Role-based access control (Admin / Member)
- Admin privileges: Create projects, manage team members, assign tasks
- Member privileges: View assigned tasks, update task status
- Dashboard with progress tracking (Total tasks, Completed, Overdue)
- Premium dark mode UI with glassmorphism

Tech Stack:
- Frontend: React.js, React Router, Axios, Vanilla CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT (JSON Web Tokens)

How to Run Locally:
1. Ensure MongoDB is running on your system (or configure a remote MongoDB cluster in your .env file).
2. Open a terminal and navigate to the `backend` folder. Run `npm install`, then `node server.js` (runs on port 5000).
3. Open another terminal and navigate to the `frontend` folder. Run `npm install`, then `npm start` (runs on port 3000).
4. Access the web application in your browser at http://localhost:3000.

Testing the Application:
- The registration page allows you to select a role ("Admin" or "Member").
- Register an "Admin" account first. Log in, create a project, and create a task.
- Register a "Member" account. Notice that members cannot create projects/tasks, but they can view and update the status of tasks assigned to them.
