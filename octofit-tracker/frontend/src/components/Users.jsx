import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Users() {
  const [users, setUsers] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchItems('users').then(setUsers).catch((err) => setError(err.message)) }, [])
  return <><p className="eyebrow">YOUR COMMUNITY</p><h1 className="page-title">Users</h1><p className="page-description">The people making progress alongside you.</p>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{users.map((user) => <article className="col-md-6" key={user._id || user.id}><div className="data-card"><span className="avatar">{user.username?.[0]?.toUpperCase() || '?'}</span><h2>{user.username}</h2><p>{user.email}</p>{user.profile?.grade && <span className="tag">Grade {user.profile.grade}</span>}</div></article>)}{users.length === 0 && <p className="empty-state">No users found.</p>}</div>}</>
}
export default Users