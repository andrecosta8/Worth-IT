import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import CommentBox from "../../components/CommentBox/CommentBox";
import { PasswordForm } from "../../components/PasswordForm/PasswordForm";
import { formatDate } from "../../services/utils";
import { Avatar, } from "@mui/joy";
import { blue  } from "@mui/material/colors";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";


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
      {passForm === true ? (
          <PasswordForm user={user} togglePassForm={togglePassForm} />
        ) : (
          <>
      <div class="wave"></div><div class="wave"></div><div class="wave"></div>
      <div className="profileHeader">
      <Card className="card" >
      <CardContent className="cardContent">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
    {commentBox ? 
        <CommentBox
          comment={commentToEdit}
          edit={true}
          getComments={getCommentsList}
          productId={commentToEdit.productId}
          toggleCommentBox={toggleCommentBox}
        />
          :   <div className="commentsDiv">
          <div className="flagedComments">
          <div className="title">FLAGED COMMENTS:</div>
          {comments.map((comment) => {
            if (comment.badWordFlaged && comment.userID === user.id)
              return (
                <Card className="profileCommentCard" sx={{ width: 400 }}>
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
                <Button variant="contained" color="primary" onClick={() => toggleCommentBox(comment)} size="small">Edit</Button>
                </CardActions>
                </Card>
              );
          })}
         
          </div>
          <div className="reportedComments">
          <div className="title">REPORTED COMMENTS:</div>
          {comments.map((comment) => {
            if (comment.reported  && comment.userID === user.id)
              return (
              <Card className="profileCommentCard" sx={{ width: 400 }}>
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
                <div className="reason">
                          <Typography>Reason: {comment.reportReason}</Typography>
                        </div>
              </CardContent>
                <CardActions disableSpacing>
                <Button variant="contained" color="error" onClick={() => deleteThisComment(comment)} size="small">Delete</Button>
                {comment.reportedCommmentEdit === true ?  <Button variant="contained" color="primary" onClick={() => toggleCommentBox(comment)} size="small">Edit</Button> : <span>Waiting for Admin review</span>}
                </CardActions>
                </Card>
               
              );
          })}
          </div>
          </div>  }
 
      {/* {commentBox === true ? (
        <CommentBox
          comment={commentToEdit}
          toggleCommentBox={toggleCommentBox}
          productId={commentToEdit.productId}
          getComments={getCommentsList}
          edit={true}
        />
      ) : null} */}
     </> )}
     
    </div>
  );
};

export default Profile;
