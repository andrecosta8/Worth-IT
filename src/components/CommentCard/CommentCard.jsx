import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AuthContext } from "../../providers/AuthProvider";
import { deleteComment, updateComment } from "../../services/apiCalls";
import { formatDate } from "../../services/utils";
import ReportIcon from "@mui/icons-material/Report";
import { Tooltip } from "@mui/joy";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert } from "../Alert/Alert";

export default function CommentCard({ comment, getComments, isEditing }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState(null)
   const[openReport, setOpenReport] = useState(false);
  const [action, setAction] = useState("");
  const { admin, user } = useContext(AuthContext);
  let formatedDate = formatDate(comment.createdAt);

  const deleteThisComment = async (comment) => {
    try {
      await deleteComment(comment);
      getComments();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const editThisComment = (comment) => {
    isEditing(comment);
  };

  const reportThisComment = async (comment, reason) => {
    const reportedComment = {
      reported: true,
      offline: true,
      id: comment.id,
      reportReason: reason,
    };
    try {
      await updateComment(reportedComment);
      getComments();
      setReason(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleReason = (e) => {
    setReason(e.target.value)
  };

   const handleClickOpen = (actionToDo, comment) => {
    setAction(actionToDo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (
    <div className="commentCardDesign">
      <Alert action={action} open={open} handleClose={handleClose} deleteThisComment={deleteThisComment} commentToAction={comment}/>
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
                <DeleteIcon onClick={() => handleClickOpen("deleteComment")} />
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
                <ReportIcon onClick={handleClickOpenReport} />
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
          {!reason ? null : <Button onClick={() => reportThisComment(comment, reason)}>Report</Button> }
        </DialogActions>
      </Dialog>
    </div>
  );
}
