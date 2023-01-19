import { IconButton, Typography } from "@mui/joy";
import Button from '@mui/material/Button';
import { Avatar, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../services/apiCalls";
import "./CommentsManagement.css";
import { blue  } from "@mui/material/colors";
import { formatDate } from "../../services/utils";

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

  const approveThisComment = async (comment) => {
   await updateComment({
      id: comment.id,
      reported: false,
      offline: false,
      reportedCommmentEdit: false,
    });
    getCommentsList();
  };

  const permissionToEdit = async (comment) => {
    await updateComment({
      id: comment.id,
      reportedCommmentEdit: !comment.reportedCommmentEdit,
    });
    getCommentsList();
  }

  return (
    <div className="adminCommentsDesign">
      <div className="badWordsCommentsDesign">
      <span className="title">BAD WORDS AUTOMATIC FLAGED COMMENTS:</span>
      {comments.sort((a,b)=> b.createdAt > a.createdAt ? 1:-1).map((comment) => {
        if (comment.badWordFlaged === true)
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
            </CardActions>
            </Card>
          );
      })}
      </div>
      <div className="reportedCommentsDesign">
        <span className="title">REPORTED COMMENTS:</span>
      {comments.sort((a,b)=> b.createdAt > a.createdAt ? 1:-1).map((comment) => {
        if (comment.reported === true)
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
            <Button variant="contained" color="error" onClick={() => deleteThisComment(comment)} size="small">Delete</Button>
            {comment.reportedCommmentEdit === true ? <Button variant="contained" color="primary" onClick={() => permissionToEdit(comment)} size="small">Remove edit permissions</Button> :<Button variant="contained" color="primary" onClick={() => permissionToEdit(comment)} size="small">Allow user to edit</Button> }
            <Button variant="contained" color="success" onClick={() => approveThisComment(comment)} size="small">Approve</Button>
            </CardActions>
            </Card>
           
          );
      })}
      </div>
    </div>
  );
};

export default CommentsManagement;

