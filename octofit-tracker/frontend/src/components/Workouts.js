import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    console.log('Workouts API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(workoutsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
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
        <p className="mt-3">Loading workouts...</p>
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
        <h2><i className="bi bi-calendar-check me-2"></i>Workout Suggestions</h2>
      </div>
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Activity Type</th>
                <th>Duration (min)</th>
                <th>Difficulty</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No workout suggestions found</td>
                </tr>
              ) : (
                workouts.map(workout => (
                  <tr key={workout._id}>
                    <td><strong>{workout.name}</strong></td>
                    <td>{workout.description}</td>
                    <td><span className="badge bg-primary">{workout.activity_type}</span></td>
                    <td>{workout.duration}</td>
                    <td>
                      <span className={`badge ${
                        workout.difficulty === 'Beginner' ? 'bg-success' :
                        workout.difficulty === 'Intermediate' ? 'bg-warning text-dark' :
                        'bg-danger'
                      }`}>
                        {workout.difficulty}
                      </span>
                    </td>
                    <td><strong>{workout.calories_estimate}</strong></td>
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

export default Workouts;
