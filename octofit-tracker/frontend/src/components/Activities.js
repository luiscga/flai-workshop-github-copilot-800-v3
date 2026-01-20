import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
    console.log('Activities API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(activitiesData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
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
        <p className="mt-3">Loading activities...</p>
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
        <h2><i className="bi bi-activity me-2"></i>Activities</h2>
      </div>
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Distance (km)</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No activities found</td>
                </tr>
              ) : (
                activities.map(activity => (
                  <tr key={activity._id}>
                    <td><span className="badge bg-secondary">{activity._id}</span></td>
                    <td><span className="badge bg-info">{activity.user_id}</span></td>
                    <td><span className="badge bg-primary">{activity.activity_type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.distance || 'N/A'}</td>
                    <td><strong>{activity.calories}</strong></td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
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

export default Activities;
