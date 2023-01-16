import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../services/apiCalls";
import "./CommentsManagement.css";

const CommentsManagement = () => {
  const [comments, setComments] = useState([]);
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCommentsList();
  }, []);

  useEffect(() => {
    if (admin === null) navigate("/");
  });

  const getCommentsList = async () => {
    try {
      let response = await getAllComments();
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteThisComment = (comment) => {
    deleteComment(comment);
    getCommentsList();
  };

  const approveThisComment = (comment) => {
    updateComment({
      id: comment.id,
      reported: false,
    });
    getCommentsList();
  };

  return (
    <div className="adminDesign">
      <div>LIST OF FLAGED COMMENTS:</div>
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
      <div>LIST OF REPORTED COMMENTS:</div>
      {comments.map((comment) => {
        if (comment.reported === true)
          return (
            <div>
              <div>{comment.user}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.body}</div>
              <button onClick={() => deleteThisComment(comment)}>DELETE</button>
              <button onClick={() => approveThisComment(comment)}>
                APPROVE
              </button>
              <br></br>
            </div>
          );
      })}
    </div>
  );
};

export default CommentsManagement;
