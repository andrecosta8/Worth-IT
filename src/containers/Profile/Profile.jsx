import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import CommentBox from "../../components/CommentBox/CommentBox";
import { PasswordForm } from "../../components/PasswordForm/PasswordForm";
import { formatDate } from "../../services/utils";
import { Avatar, Card, CardContent, Typography } from "@mui/joy";
import { blue  } from "@mui/material/colors";
import { Button, CardActions, CardHeader } from "@mui/material";


const Profile = () => {
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState("");
  const [passForm, setPassForm] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCommentsList();
  }, []);

  useEffect(() => {
    if (user === null) navigate("/");
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

  const toggleCommentBox = (comment) => {
    setCommentBox(!commentBox);
    setCommentToEdit(comment);
  };

  const togglePassForm = () => {
    setPassForm(!passForm);
  };

  return (
    <div className="profileDesign">
      <div class="wave"></div><div class="wave"></div><div class="wave"></div>
      <div>
        USER INFO:
        <div>{user.name}</div>
        <div>{user.email}</div>
        <button onClick={() => togglePassForm()}>Change PASSWORD</button>
        {passForm === true ? (
          <PasswordForm user={user} togglePassForm={togglePassForm} />
        ) : null}
      </div>
      <div>FLAGED COMMENTS:</div>
      {comments.map((comment) => {
        if (comment.badWordFlaged === true && comment.userID === user.id)
          return (
            <Card sx={{ width: 400 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {comment.user.charAt(0)}
              </Avatar>
            }
            title={comment.user}
            subheader={formatDate(comment.createdAt)}
          />
          <CardContent>
            <Typography>{comment.body}</Typography>
          </CardContent>
            <CardActions disableSpacing>
            <Button variant="contained" color="error" onClick={() => deleteThisComment()} size="small">Delete</Button>
            <Button variant="contained" color="primary" onClick={() => toggleCommentBox()} size="small">Edit</Button>
            </CardActions>
            </Card>
            // <div> 
            //   <div>{comment.user}</div>
            //   <div>{comment.createdAt}</div>
            //   <div>{comment.body}</div>
            //   <button onClick={() => deleteThisComment(comment)}>Delete</button>
            //   <button onClick={() => toggleCommentBox(comment)}>Edit</button>
            //   <br></br>
            // </div>
          );
      })}
      {commentBox === true ? (
        <CommentBox
          getComments={getCommentsList}
          comment={commentToEdit}
          aproval={"aproval"}
        />
      ) : null}
      <div>REPORTED COMMENTS:</div>
      {comments.map((comment) => {
        if (comment.reported === true && comment.userID === user.id)
          return (
            <div>
              {" "}
              <div>{comment.user}</div>
              <div>{comment.createdAt}</div>
              <div>{comment.body}</div>
              <button onClick={() => deleteThisComment(comment)}>Delete</button>
              <span>Waiting Admin aproval</span>
              <br></br>
            </div>
          );
      })}
    </div>
  );
};

export default Profile;
