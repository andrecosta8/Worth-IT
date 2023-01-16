import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue  } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, updateComment } from "../../services/apiCalls";
import { formatDate } from "../../services/utils";
import ReportIcon from '@mui/icons-material/Report';

export default function CommentCard({ comment, getComments, isEditing }) {
  const { admin, user } = useContext(AuthContext);
  let formatedDate = formatDate(comment.createdAt);

  const deleteThisComment = async (comment) => {
    try {
      await deleteComment(comment);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  const editThisComment = (comment) => {
    isEditing(comment);
  };

  const reportThisComment = async (comment) => {
    const reportedComment = {
      reported: true,
      editingCredentials: false,
      id: comment.id,
    };
    try {
      await updateComment(reportedComment);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="commentCardDesign">
      {admin !== null ? (
        <Card sx={{ width: 400 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {comment.user.charAt(0)} 
              </Avatar>
            }
            title={comment.user}
            subheader={formatedDate}
          />
          <CardContent>
            <Typography>{comment.body}</Typography>
          </CardContent>
          <CardActions disableSpacing>
            {user.id === comment.userID ? (
              <IconButton>
                <EditIcon onClick={() => editThisComment(comment)} />
              </IconButton>
            ) : null}
            <IconButton>
              <DeleteIcon onClick={() => deleteThisComment(comment)} />
            </IconButton>
          </CardActions>
        </Card>
      ) : (
        <Card sx={{ width: 400 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                {comment.user.charAt(0)}
              </Avatar>
            }
            title={comment.user}
            subheader={formatedDate}
          />
          <CardContent>
            <Typography>{comment.body}</Typography>
          </CardContent>
          {user.id === comment.userID ? (
            <CardActions disableSpacing>
              <IconButton>
                <DeleteIcon onClick={() => deleteThisComment(comment)} />
              </IconButton>
              <IconButton>
                <EditIcon onClick={() => editThisComment(comment)} />
              </IconButton>
            </CardActions>
          ) : (
            <CardActions disableSpacing>
              <IconButton>
                <ReportIcon onClick={() => reportThisComment(comment)} />
              </IconButton>
            </CardActions>
          )}
        </Card>
      )}
    </div>
  );
}
