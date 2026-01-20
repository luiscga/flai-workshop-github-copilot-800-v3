import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    team: ''
  });
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchTeams();
  }, []);

  const fetchUsers = () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
    console.log('Users API endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users data fetched:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(usersData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  const fetchTeams = () => {
    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const teamsData = data.results || data;
        setTeams(teamsData);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      team: user.team || ''
    });
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditForm({
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      team: ''
    });
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setSaveError(null);
    setSaveSuccess(false);

    const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/${editingUser._id}/`;
    
    // Prepare the data - include password if it's required
    const updateData = {
      username: editForm.username,
      email: editForm.email,
      first_name: editForm.first_name,
      last_name: editForm.last_name,
      team: editForm.team,
      password: editingUser.password || 'password123' // Keep existing password
    };

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(JSON.stringify(err));
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('User updated:', data);
        setSaveSuccess(true);
        // Update the user in the local state
        setUsers(users.map(u => u._id === editingUser._id ? data : u));
        setTimeout(() => {
          handleCancel();
        }, 1500);
      })
      .catch(error => {
        console.error('Error updating user:', error);
        setSaveError('Failed to update user. Please try again.');
      });
  };

  if (loading) return (
    <div className="container page-container">
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading users...</p>
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
        <h2><i className="bi bi-people-fill me-2"></i>Users</h2>
      </div>
      <div className="table-container">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No users found</td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id}>
                    <td><span className="badge bg-secondary">{user._id}</span></td>
                    <td><strong>{user.username}</strong></td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      {user.team ? (
                        <span className="badge bg-primary">{user.team}</span>
                      ) : (
                        <span className="text-muted">No team</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(user)}
                        data-bs-toggle="modal"
                        data-bs-target="#editUserModal"
                      >
                        <i className="bi bi-pencil-fill me-1"></i>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">
                <i className="bi bi-person-fill-gear me-2"></i>
                Edit User
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
            </div>
            <div className="modal-body">
              {saveSuccess && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  User updated successfully!
                </div>
              )}
              {saveError && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {saveError}
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={editForm.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={editForm.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={editForm.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="team" className="form-label">Team</label>
                  <select
                    className="form-select"
                    id="team"
                    name="team"
                    value={editForm.team}
                    onChange={handleInputChange}
                  >
                    <option value="">No Team</option>
                    {teams.map(team => (
                      <option key={team._id} value={team.name}>{team.name}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSave}>
                <i className="bi bi-save-fill me-1"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
