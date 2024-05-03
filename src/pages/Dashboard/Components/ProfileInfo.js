import React, { useState } from 'react';

function ProfileInfo() {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Handle saving the updated profile information
    setEditing(false);
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Profile Info</h3>
      {editing ? (
        <>
          <input
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="p-2 border rounded mb-2"
          />
          <input
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="p-2 border rounded mb-2"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </>
      ) : (
        <>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={handleEditClick} className="bg-blue-500 text-white px-4 py-2 rounded">
            Edit
          </button>
        </>
      )}
    </div>
  );
}

export default ProfileInfo;
