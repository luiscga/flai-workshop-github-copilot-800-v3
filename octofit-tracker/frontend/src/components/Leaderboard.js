import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
    console.log('Leaderboard API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(leaderboardData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="container page-container">
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="container page-container">
      <div className="alert alert-danger error-container" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="container page-container">
      <div className="page-header">
        <h2><i className="bi bi-trophy-fill me-2"></i>Leaderboard</h2>
      </div>
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Team</th>
                <th>Activities</th>
                <th>Duration (min)</th>
                <th>Total Calories</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No leaderboard entries found</td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => {
                  let rankBadge = 'bg-secondary';
                  if (entry.rank === 1) rankBadge = 'bg-warning text-dark';
                  else if (entry.rank === 2) rankBadge = 'bg-secondary';
                  else if (entry.rank === 3) rankBadge = 'bg-danger';
                  
                  return (
                    <tr key={entry._id}>
                      <td><span className={`badge ${rankBadge}`}>#{entry.rank}</span></td>
                      <td><strong>{entry.username}</strong></td>
                      <td><span className="badge bg-primary">{entry.team || 'N/A'}</span></td>
                      <td>{entry.total_activities}</td>
                      <td>{entry.total_duration}</td>
                      <td><strong className="text-success">{entry.total_calories}</strong></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
