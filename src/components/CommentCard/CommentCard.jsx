import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, updateComment } from "../../services/apiCalls";
import { Collapse } from "@mui/material";
import CommentBox from "../CommentBox/CommentBox";
import { ExpandMore } from "@mui/icons-material";
import { formatDate } from "../../services/utils";

export default function CommentCard({ comment, getComments, isEditing }) {
  const { admin, user } = useContext(AuthContext);
  let formatedDate = formatDate(comment.createdAt);

  const deleteThisComment = (comment) => {
    deleteComment(comment);
    getComments();
  };

  const editThisComment = (comment) => {
    isEditing(comment);
  };

  const reportThisComment = (comment) => {
    const reportedComment = {
       reported: true,
       id:comment.id
    }
    updateComment(reportedComment);
    getComments();
  }

  return (
    <Card sx={{ width: 400 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
            <ThumbUpIcon />
          </IconButton>
          <button onClick={()=> reportThisComment(comment)}>REPORT</button>
        </CardActions>
      )}
    </Card>
  );
}
