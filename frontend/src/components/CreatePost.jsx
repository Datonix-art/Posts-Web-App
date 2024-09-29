import React, { useState, useEffect } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [existingTitles, setExistingTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const url = 'http://127.0.0.1:5000';
  const create_post_url = url + '/create_post';
  const all_posts_url = url + '/get_posts';
  
  const fetchPosts = async () => {
    try {
      const response = await fetch(all_posts_url, {
        method: 'GET',
        mode: 'cors'
      });
      const data = await response.json();
      setExistingTitles(data.posts.map(post => post.title));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  const isTitleUnique = (title) => {
    return !existingTitles.includes(title);
  };
   
  useEffect(() => {
    if (!isTitleUnique(title)) {
      setErrorMessage('Title must be unique!');
    } else {
      setErrorMessage('');
    }
  }, [title, existingTitles]);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!isTitleUnique(title)) {
      setErrorMessage('Title must be unique!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    setIsLoading(true); 

    try {
      const response = await fetch(create_post_url, {
        method: 'POST',
        mode: 'cors',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'An unknown error occurred');
        return;
      }

      await response.json();
      setTitle(''); 
      setContent('');
      setImage(null);
      setErrorMessage('');
    } catch (err) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <form onSubmit={onFormSubmit} method="post" encType="multipart/form-data">
      <div className="title">
        <label htmlFor="title">Title: </label>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <br />
      <div className="content">
        <label htmlFor="content">Content: </label>
        <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <br />
      <div className="image">
        <label htmlFor="image">Image: </label>
        <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} required />
      </div>
      <br />
      <div className="button">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create post'}
        </button>
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

export default CreatePost;
