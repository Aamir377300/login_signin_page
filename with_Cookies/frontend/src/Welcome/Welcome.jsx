import React, { useEffect, useState } from "react";

function Welcome() {
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  const fetchProfile = () => {
    fetch("http://localhost:5002/api/auth/profile", {
      method: "GET",
      credentials: "include", // send cookies
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          setUsername(data.username);
        } else {
          setUsername(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setUsername(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Logout function
  const handleLogout = () => {
    fetch("http://localhost:5002/api/auth/logout", {
      method: "POST",
      credentials: "include", // send cookies
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setUsername(null); // clear username after logout
      })
      .catch((err) => console.error("Logout error:", err));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="welcome-bar">
        {username ? (
          <p>Welcome, {username}</p>
        ) : (
          <p>Please login first</p>
        )}
      </div>

      {!username && <a href="/login">Login</a>}

      {username && (
        <button onClick={handleLogout} style={{ marginTop: "10px" }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default Welcome;
