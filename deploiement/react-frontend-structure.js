// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Students from './pages/Students';
import Grades from './pages/Grades';
import Attendance from './pages/Attendance';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/courses" component={Courses} />
          <Route path="/students" component={Students} />
          <Route path="/grades" component={Grades} />
          <Route path="/attendance" component={Attendance} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/grades">Grades</Link></li>
        <li><Link to="/attendance">Attendance</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

// src/pages/Dashboard.js
import React from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Add dashboard content here */}
    </div>
  );
}

export default Dashboard;

// Similar structure for other pages (Courses.js, Students.js, Grades.js, Attendance.js, Login.js)

// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const login = (username, password) => {
  return axios.post(`${API_URL}/auth/login`, { username, password });
};

export const getCourses = () => {
  return axios.get(`${API_URL}/courses`);
};

export const getStudents = () => {
  return axios.get(`${API_URL}/users?role=student`);
};

// Add more API calls as needed

// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // Store user data in localStorage or sessionStorage
  };

  const logout = () => {
    setUser(null);
    // Clear user data from localStorage or sessionStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
