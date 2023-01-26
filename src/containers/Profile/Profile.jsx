import "./Profile.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CommentBox from "../../components/CommentBox/CommentBox";
import React, { useContext, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { AuthContext } from "../../providers/AuthProvider";
import { Avatar } from "@mui/joy";
import { Button } from "@mui/material";
import { PasswordForm } from "../../components/PasswordForm/PasswordForm";
import { blue } from "@mui/material/colors";
import { deleteComment, getAllComments } from "../../services/apiCalls";
import { formatDate } from "../../services/utils";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [commentBox, setCommentBox] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState("");
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [passForm, setPassForm] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getCommentsList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user === null) navigate("/");
  });

  const getCommentsList = async () => {
    try {
      let response = await getAllComments();
      setComments(response.data);
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };

  const deleteThisComment = async (comment) => {
    try {
      await deleteComment(comment);
      getCommentsList();
    } catch (err) {
      setError(err);
      console.error(error);
    }
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
      {passForm ? (
        <PasswordForm user={user} togglePassForm={togglePassForm} />
      ) : (
        <>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="profileHeader">
            <Card className="card">
              <CardContent className="cardContent">
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  <h3>User: {user.name}</h3>
                  <h5>ID: {user.id}</h5>
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  <h5>E-mail: {user.email}</h5>
                </Typography>
              </CardContent>
              <CardActions className="cardActions">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    setTimeout(() => {
                      togglePassForm();
                    }, 250)
                  }
                >
                  Change Password
                </Button>
              </CardActions>
            </Card>
          </div>
          {commentBox ? (
            <CommentBox
              comment={commentToEdit}
              edit={true}
              getComments={getCommentsList}
              productId={commentToEdit.productId}
              toggleCommentBox={toggleCommentBox}
            />
          ) : (
            <div className="commentsDiv">
              <div className="flagedComments">
                <Tooltip
                  title="These comments were automatically flagged for using profanity."
                  placement="top"
                >
                  <div className="title">FLAGGED COMMENTS:</div>
                </Tooltip>
                {comments.map((comment) => {
                  if (comment.badWordFlaged && comment.userID === user.id)
                    return (
                      <Card
                        key={comment.id}
                        className="profileCommentCard"
                        sx={{ width: 400 }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: blue[500] }}
                              aria-label="recipe"
                            >
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
                            onClick={() => deleteThisComment(comment)}
                            size="small"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => toggleCommentBox(comment)}
                            size="small"
                          >
                            Edit
                          </Button>
                        </CardActions>
                      </Card>
                    );
                })}
              </div>
              <div className="reportedComments">
                <Tooltip
                  title="These comments were reported by some user"
                  placement="top"
                >
                  <div className="title">REPORTED COMMENTS:</div>
                </Tooltip>
                {comments.map((comment) => {
                  if (comment.reported && comment.userID === user.id)
                    return (
                      <Card
                        key={comment.id}
                        className="profileCommentCard"
                        sx={{ width: 400 }}
                      >
                        <CardHeader
                          avatar={
                            <Avatar
                              sx={{ bgcolor: blue[500] }}
                              aria-label="recipe"
                            >
                              {comment.user.charAt(0)}
                            </Avatar>
                          }
                          title={comment.user}
                          subheader={formatDate(comment.createdAt)}
                        />
                        <CardContent>
                          <Typography>{comment.body}</Typography>
                          <div className="reason">
                            <Typography>
                              Reason: {comment.reportReason}
                            </Typography>
                          </div>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteThisComment(comment)}
                            size="small"
                          >
                            Delete
                          </Button>
                          {comment.reportedCommmentEdit === true ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => toggleCommentBox(comment)}
                              size="small"
                            >
                              Edit
                            </Button>
                          ) : (
                            <span>Waiting for Admin review</span>
                          )}
                        </CardActions>
                      </Card>
                    );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
