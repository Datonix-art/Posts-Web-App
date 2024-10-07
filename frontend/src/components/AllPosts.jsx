import React, {useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import styles from '../modules/AllPosts.module.css'

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const url = 'http://127.0.0.1:5000/get_posts'
  const image_path = 'http://127.0.0.1:5000/static/images/'

  const fetchAllPosts = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors'
      })
      const data = await response.json()
      setPosts(data?.posts || [])
    } catch (err) {
      console.error(err.message)
      setErrorMessage('Failed to fetch products from the server. Please they again later')
    } 
  }

  useEffect(() => {
    fetchAllPosts()
  }, [posts])

  return (
  <div>
   <h1 className={styles.mainTitle}>Posts</h1>
   <ul className={styles.container}>
    {errorMessage ? <p className={styles.error}>{errorMessage}</p> : posts && posts.length ? posts.map((post) => (
      <li key={`${post.title}-${post.id}`} className={styles.itemContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <p>{post.content}</p>
        <img src={image_path + post.image} alt={post.title} className={styles.image}/>
        <CreateComment id={post.id}/>
      </li>
    )): (<p>No posts found!</p>)} 
   </ul>
  </div>
  )
}

export default AllPosts