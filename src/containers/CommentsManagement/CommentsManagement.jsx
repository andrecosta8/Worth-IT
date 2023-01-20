import { IconButton, Typography } from "@mui/joy";
import Button from "@mui/material/Button";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../services/apiCalls";
import "./CommentsManagement.css";
import { blue } from "@mui/material/colors";
import { formatDate } from "../../services/utils";
import { Alert } from "../../components/Alert/Alert";

const CommentsManagement = () => {
  const [action, setAction] = useState("");
  const [commentToAction, setCommentToAction] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    getCommentsList();
  }, []);

  useEffect(() => {
    if (!admin) navigate("/");
  });

  const getCommentsList = async () => {
    try {
      let response = await getAllComments();
      setComments(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const deleteThisComment = (comment) => {
    deleteComment(comment);
    getCommentsList();
    handleClose();
  };

  const approveThisComment = (comment) => {
    updateComment({
      id: comment.id,
      offline: false,
      reported: false,
      reportedCommmentEdit: false,
    });
    getCommentsList();
    handleClose();
  };

  const permissionToEdit = (comment) => {
    updateComment({
      id: comment.id,
      reportedCommmentEdit: !comment.reportedCommmentEdit,
    });
    getCommentsList();
  };

  const handleClickOpen = (actionToDo, comment) => {
    setAction(actionToDo);
    setCommentToAction(comment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (
    <div className="adminCommentsDesign">
      <div className="commentsDiv">
        <div className="badWordsCommentsDesign">
          <div className="title">BAD WORDS FLAGED COMMENTS:</div>
          {comments
            .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
            .map((comment) => {
              if (comment.badWordFlaged)
                return (
                  <Card className="commentCard" sx={{ width: 400 }}>
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleClickOpen("deleteComment", comment)
                        }
                        size="small"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                );
            })}
        </div>
        <div className="reportedCommentsDesign">
          <div className="title">REPORTED COMMENTS:</div>
          {comments
            .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
            .map((comment) => {
              if (comment.reported)
                return (
                  <Card className="commentCard" sx={{ width: 400 }}>
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
                    <div className="reason">
                      <Typography>Reason: {comment.reportReason}</Typography>
                    </div>
                    <CardActions disableSpacing>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleClickOpen("deleteComment", comment)
                        }
                        size="small"
                      >
                        Delete
                      </Button>
                      {comment.reportedCommmentEdit ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => permissionToEdit(comment)}
                          size="small"
                        >
                          Remove edit permissions
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => permissionToEdit(comment)}
                          size="small"
                        >
                          Allow user to edit
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() =>
                          handleClickOpen("approveComment", comment)
                        }
                        size="small"
                      >
                        Approve
                      </Button>
                    </CardActions>
                  </Card>
                );
            })}
        </div>
      </div>
      <Alert
        action={action}
        handleClose={handleClose}
        deleteThisComment={deleteThisComment}
        approveThisComment={approveThisComment}
        commentToAction={commentToAction}
        open={open}
      />
    </div>
  );
};

export default CommentsManagement;
