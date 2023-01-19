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
import { Tooltip } from "@mui/joy";

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
      offline: true,
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
              <Tooltip title="Delete this comment" placement="top-start">
              <IconButton>
                <DeleteIcon onClick={() => deleteThisComment(comment)} />
              </IconButton>
              </Tooltip>
              <Tooltip title="Edit this comment" placement="right">
              <IconButton>
                <EditIcon onClick={() => editThisComment(comment)} />
              </IconButton>
              </Tooltip>
            </CardActions>
          ) : (
            <CardActions disableSpacing>
              <Tooltip title="Report this comment" placement="right">
              <IconButton>
                <ReportIcon onClick={() => reportThisComment(comment)} />
              </IconButton>
              </Tooltip>
            </CardActions>
          )}
        </Card>
    </div>
  );
}

