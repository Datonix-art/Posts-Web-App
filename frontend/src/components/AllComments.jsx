import React, {useEffect, useState} from "react"; 
import styles from '../modules/AllComments.module.css'

const AllComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const fetchComments = async () => {
    const response = await fetch(`http://127.0.0.1:5000/get_comments?post_id=${postId}`)
    const data = await response.json()
    if(response.ok) {
      setComments(data.comments)
      setMessage(data.message)
    } else {
      setError(data.error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [fetchComments])
  
  return (
    <div className={styles.allComments}>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className={styles.comment}>
            <p>Comment:{comment.id}. {comment.comment}</p>
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};


export default AllComments