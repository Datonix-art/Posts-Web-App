import React, { useState } from "react";

const DeletePosts = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const onBtnClick = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/delete_posts', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error || 'An unexpected error occurred.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
      console.error(err);
    }
  };

  return (
    <section style={{ padding: '1em 0' }}>
      <button
        type="button"
        style={{ width: '10%', padding: '0.5em', cursor: 'pointer' }}
        onClick={onBtnClick}
      >
        Delete all the posts
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
};

export default DeletePosts;
