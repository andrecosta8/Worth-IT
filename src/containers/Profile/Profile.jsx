import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import CommentBox from "../../components/CommentBox/CommentBox";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState(false);
  
  const navigate = useNavigate();

  const getCommentsList = async () => {
    let response = await getAllComments();
    setComments(response.data);
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  const deleteThisComment = (comment) => {
    deleteComment(comment)
    getCommentsList();
  };

  const editThisComment = () => {
    setCommentBox(!commentBox);
  };

  return (
    <div className="profileDesign">
      <div>
        USER INFO:
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>
      <div>FLAGED COMMENTS:</div>
      {comments.map((comment) => {
        if (comment.badWordFlaged === true && comment.userID === user.id)
          return (
            <div>
              {" "}
              <div>{comment.user}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.body}</div>
              <button onClick={() => deleteThisComment(comment)}>Delete</button>
              <button onClick={()=> editThisComment(comment)}>Edit</button>
              <br></br>
              {commentBox === true ? <CommentBox getComments={getCommentsList} comment={comment}  /> : null}
            </div>
          );
      })}
    </div>
  );
};

export default Profile;
