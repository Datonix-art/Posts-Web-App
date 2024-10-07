import React, { useState } from "react";
import AllComments from "./AllComments";
import styles from '../modules/CreateComment.module.css';

const CreateComment = ({ id }) => {
 const [comment, setComment] = useState('')
 const [errorMessage, setErrorMessage] = useState('')

 const url = 'http://127.0.0.1:5000/create_comment'
 
 const onCreateComment = async (e) => {
  e.preventDefault();

  if(!comment.trim()) {
    setErrorMessage('Cannot be empty.')
    return
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment, post_id: id })
    });

    const text = await response.text(); 
    console.log(text); 

    if (!response.ok) {
      try {
        const errorData = JSON.parse(text);
        setErrorMessage(errorData.error || 'An unknown error occurred');
      } catch (parseError) {
        setErrorMessage('An unknown error occurred');
      }
    } else {
      const data = JSON.parse(text);
      console.log(data)
      setComment('');
      setErrorMessage('');
    }
  } catch (err) {
    setErrorMessage(`Error: ${err}`);
  }
};

 return (
   <div className={styles.commentContainer}>
     <form onSubmit={onCreateComment}>
      <label htmlFor="comment">Add your comment to the post:</label>
      <input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment"/>
      <button type="submit" className={styles.button}>Create comment</button>
     </form> 
     <br/>
     {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
     <AllComments postId={id}/>
   </div>
 )
}

export default CreateComment