import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, getAllComments } from "../../services/apiCalls";
import "./CommentsManagement.css";

const CommentsManagement = () => {
  const [comments, setComments] = useState([]);
  const { admin } = useContext(AuthContext);
  const getCommentsList = async () => {
    let response = await getAllComments();
    setComments(response.data);
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  const deleteThisComment = (comment) => {
    deleteComment(comment);
    getCommentsList();
  };

  return (
    <div>
      <div className="adminDesign">LIST OF FLAGED COMMENTS:</div>
      {comments.map((comment) => {
        if (comment.badWordFlaged === true)
          return (
            <div>
              <div>{comment.user}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.body}</div>
              <button onClick={() => deleteThisComment(comment)}>DELETE</button>
              <br></br>
            </div>
          );
      })}
    </div>
  );
};

export default CommentsManagement;
