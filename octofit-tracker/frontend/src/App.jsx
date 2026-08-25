import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg app-header">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="/octofitapp-small.png" alt="" width="36" height="36" />
            <span>OctoFit</span>
          </NavLink>
          <nav className="nav nav-pills ms-auto" aria-label="Main navigation">
            <NavLink className="nav-link" to="/">Overview</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </nav>
        </div>
      </header>
      <main className="container py-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <section className="dashboard-intro">
      <p className="eyebrow">FITNESS COMMAND CENTER</p>
      <h1>Move with your team.</h1>
      <p className="lead">Track progress, find your next workout, and keep the leaderboard moving.</p>
      <div className="dashboard-links">
        <NavLink className="btn btn-primary" to="/activities">Log activity</NavLink>
        <NavLink className="btn btn-outline-dark" to="/workouts">Explore workouts</NavLink>
      </div>
    </section>
  )
}

export default App
