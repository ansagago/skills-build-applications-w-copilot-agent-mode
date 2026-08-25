import { useEffect, useState } from 'react'
import { fetchItems } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchItems('/api/leaderboard/').then(setEntries).catch((err) => setError(err.message)) }, [])
  return <><p className="eyebrow">COMPETE KINDLY</p><h1 className="page-title">Leaderboard</h1><p className="page-description">Every point is a reason to keep going.</p>{error ? <div className="alert alert-warning">{error}</div> : <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Rank</th><th>Athlete</th><th>Points</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry._id || entry.id}><td><strong>#{entry.rank || index + 1}</strong></td><td>{entry.userId?.username || entry.userId || 'Unknown athlete'}</td><td>{entry.points}</td></tr>)}</tbody></table>{entries.length === 0 && <p className="empty-state">No leaderboard entries yet.</p>}</div>}</>
}
export default Leaderboard