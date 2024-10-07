import React from 'react';
import CreatePost from './components/createPost';
import AllPosts from './components/AllPosts';
import DeletePosts from './components/DeletePosts';

function App() {
  return (
    <div className="container">
        <CreatePost />
        <DeletePosts />
        <hr />
        <AllPosts />
    </div>
  );
}

export default App;
