import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchItems(teamsEndpoint).then(setTeams).catch((err) => setError(err.message)) }, [])
  return <><p className="eyebrow">FIND YOUR CREW</p><h1 className="page-title">Teams</h1><p className="page-description">Small groups, shared momentum.</p>{error ? <div className="alert alert-warning">{error}</div> : <div className="row g-3">{teams.map((team) => <article className="col-md-6 col-lg-4" key={team._id || team.id}><div className="data-card"><h2>{team.name}</h2><p>{team.members?.length || 0} members</p><div className="member-list">{team.members?.map((member) => <span className="tag" key={member._id || member.id}>{member.username || member.email}</span>)}</div></div></article>)}{teams.length === 0 && <p className="empty-state">No teams created yet.</p>}</div>}</>
}
export default Teams