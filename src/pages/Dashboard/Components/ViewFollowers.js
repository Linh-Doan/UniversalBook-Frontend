import React, { useState, useEffect } from 'react';

function ViewFollowers() {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    // Fetch and set followers data here
    // For now, let's use some mock data
    setFollowers([
      { id: 1, name: 'Jane Doe' },
      { id: 2, name: 'John Smith' },
      // Add more mock followers as needed
    ]);
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Followers</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ViewFollowers;
