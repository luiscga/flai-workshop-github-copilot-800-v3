import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    console.log('Teams API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(teamsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
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
        <p className="mt-3">Loading teams...</p>
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
        <h2><i className="bi bi-people me-2"></i>Teams</h2>
      </div>
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No teams found</td>
                </tr>
              ) : (
                teams.map(team => (
                  <tr key={team._id}>
                    <td><span className="badge bg-secondary">{team._id}</span></td>
                    <td><strong>{team.name}</strong></td>
                    <td>{team.description}</td>
                    <td>
                      <span className="badge bg-success">
                        {Array.isArray(team.members) ? team.members.length : 0} members
                      </span>
                    </td>
                    <td>{new Date(team.created_at).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
