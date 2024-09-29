import React from 'react';
import CreatePost from './components/createPost';
import AllPosts from './components/AllPosts';

function App() {
  return (
    <div className="container">
        <CreatePost />
        <hr />
        <AllPosts />
    </div>
  );
}

export default App;
