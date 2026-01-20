import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Activities from './components/Activities';
import Teams from './components/Teams';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container welcome-container">
              <div className="row justify-content-center mb-5">
                <div className="col-lg-10">
                  <div className="text-center mb-5">
                    <h1 className="welcome-title mb-3">Welcome to OctoFit Tracker</h1>
                    <p className="welcome-subtitle">Track your fitness activities, compete with your team, and achieve your goals!</p>
                  </div>
                  
                  <div className="row g-4">
                    <div className="col-md-6 col-lg-4">
                      <Link to="/users" className="dashboard-card-link">
                        <div className="dashboard-card">
                          <div className="card-icon users-icon">
                            <i className="bi bi-people-fill"></i>
                          </div>
                          <h3>Users</h3>
                          <p>View all registered users and their profiles</p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="col-md-6 col-lg-4">
                      <Link to="/activities" className="dashboard-card-link">
                        <div className="dashboard-card">
                          <div className="card-icon activities-icon">
                            <i className="bi bi-activity"></i>
                          </div>
                          <h3>Activities</h3>
                          <p>Track and manage fitness activities</p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="col-md-6 col-lg-4">
                      <Link to="/teams" className="dashboard-card-link">
                        <div className="dashboard-card">
                          <div className="card-icon teams-icon">
                            <i className="bi bi-people"></i>
                          </div>
                          <h3>Teams</h3>
                          <p>Explore teams and their members</p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="col-md-6 col-lg-4">
                      <Link to="/leaderboard" className="dashboard-card-link">
                        <div className="dashboard-card">
                          <div className="card-icon leaderboard-icon">
                            <i className="bi bi-trophy-fill"></i>
                          </div>
                          <h3>Leaderboard</h3>
                          <p>See top performers and rankings</p>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="col-md-6 col-lg-4">
                      <Link to="/workouts" className="dashboard-card-link">
                        <div className="dashboard-card">
                          <div className="card-icon workouts-icon">
                            <i className="bi bi-calendar-check"></i>
                          </div>
                          <h3>Workouts</h3>
                          <p>Discover personalized workout suggestions</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
