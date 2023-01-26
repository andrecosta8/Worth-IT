import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import React, { useContext, useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import { Alert } from "../Alert/Alert";
import { AuthContext } from "../../providers/AuthProvider";
import { blue } from "@mui/material/colors";
import { deleteComment, updateComment } from "../../services/apiCalls";
import { formatDate } from "../../services/utils";

export default function CommentCard({ comment, getComments, isEditing }) {
  const [action, setAction] = useState("");
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [reason, setReason] = useState(null);
  const formatedDate = formatDate(comment.createdAt);
  const { user } = useContext(AuthContext);

  const deleteThisComment = async (comment) => {
    try {
      await deleteComment(comment);
      getComments();
      handleClose();
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };

  const reportThisComment = async (comment, reason) => {
    const reportedComment = {
      id: comment.id,
      offline: true,
      reportReason: reason,
      reported: true,
    };
    try {
      await updateComment(reportedComment);
      getComments();
      setReason(null);
    } catch (err) {
      setError(err);
    }
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleReason = (e) => {
    setReason(e.target.value);
  };

  const handleClickOpen = (actionToDo) => {
    setAction(actionToDo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (
    <div className="commentCardDesign">
      <Alert
        action={action}
        open={open}
        handleClose={handleClose}
        deleteThisComment={deleteThisComment}
        commentToAction={comment}
      />
      <Card sx={{ width: 375, margin: 1 }}>
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
          <Typography sx={{textAlign: "center"}}>{comment.body}</Typography>
        </CardContent>
        {user.id === comment.userID ? (
          <CardActions>
            <Tooltip title="Delete this comment" placement="top-start">
              <IconButton>
                <DeleteIcon
                  color="error"
                  onClick={() => handleClickOpen("deleteComment")}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit this comment" placement="right">
              <IconButton>
                <EditIcon color="primary" onClick={() => isEditing(comment)} />
              </IconButton>
            </Tooltip>
          </CardActions>
        ) : (
          <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title="Report this comment" placement="left">
              <IconButton>
                <ReportIcon color="error" onClick={handleClickOpenReport} />
              </IconButton>
            </Tooltip>
          </CardActions>
        )}
      </Card>
      <Dialog open={openReport} onClose={handleCloseReport}>
        <DialogTitle>Do you want to report this comment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please explain why you want to report this comment...
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            name="name"
            type="name"
            onChange={(e) => {
              handleReason(e);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport}>Cancel</Button>
          {reason && (
            <Button onClick={() => reportThisComment(comment, reason)}>
              Report
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
