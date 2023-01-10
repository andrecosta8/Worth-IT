import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../providers/AuthProvider";
import { getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const getCommentsList = async () => {
    let response = await getAllComments();
    setComments(response.data);
  };

  useEffect(() => {
    getCommentsList();
  }, []);

  return (
    <div className="profileDesign">
      <div>
        USER INFO:
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>
      {comments.map((comment) => {
        if (comment.badWordFlaged === true && comment.userID === user.id)
          return (
            <div>
              {" "}
              FLAGED COMMENTS:
              <div>{comment.user}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.body}</div>
              <br></br>
            </div>
          );
      })}
    </div>
  );
};

export default Profile;
