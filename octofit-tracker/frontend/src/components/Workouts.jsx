import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchItems(workoutsEndpoint).then(setWorkouts).catch((err) => setError(err.message)) }, [])
  return <><p className="eyebrow">MAKE A PLAN</p><h1 className="page-title">Workouts</h1><p className="page-description">A focused session is closer than you think.</p>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{workouts.map((workout) => <article className="col-md-6" key={workout._id || workout.id}><div className="data-card"><div className="d-flex justify-content-between gap-2"><span className="tag">{workout.activityType}</span><span className="difficulty">{workout.difficulty}</span></div><h2>{workout.name}</h2><p>{workout.description}</p></div></article>)}{workouts.length === 0 && <p className="empty-state">No workouts available yet.</p>}</div>}</>
}
export default Workouts