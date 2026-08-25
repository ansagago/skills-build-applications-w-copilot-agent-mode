import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchItems('activities').then(setActivities).catch((err) => setError(err.message)) }, [])

  return <ResourcePage title="Activities" description="Recent movement logged by your team." error={error}>
    {!error && activities.length === 0 ? <p className="empty-state">No activities logged yet.</p> : <div className="row g-3">{activities.map((activity) => <article className="col-md-6" key={activity._id || activity.id}><div className="data-card"><span className="tag">{activity.type}</span><h2>{activity.durationMinutes} minutes</h2><p>{activity.points} points · {formatDate(activity.occurredAt)}</p></div></article>)}</div>}
  </ResourcePage>
}

const formatDate = (value) => value ? new Date(value).toLocaleDateString() : 'Date unavailable'
const ResourcePage = ({ title, description, error, children }) => <><p className="eyebrow">OCTOFIT TRACKER</p><h1 className="page-title">{title}</h1><p className="page-description">{description}</p>{error ? <div className="alert alert-warning">{error}</div> : children}</>
export default Activities