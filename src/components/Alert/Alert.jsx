import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ReactDOM  from "react-dom";

const PortalModal = ({ children, wrapperId }) => {
  return ReactDOM.createPortal(children, document.getElementById(wrapperId));
};

export const Alert = ({
  action,
  handleClose,
  deleteThisComment,
  approveThisComment,
  commentToAction,
  deleteThisProduct,
  product,
  deleteThisUser,
  user,
  open,
}) => {
  console.log(action);

  // TO USE IN THE COMPONENT:
  //   const [open, setOpen] = useState(false);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //     const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <PortalModal wrapperId="portal-root">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure do you want to proceed?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {action === "deleteComment" ? (
            <Button
              onClick={() => deleteThisComment(commentToAction)}
              autoFocus
            >
              {" "}
              Confirm
            </Button>
          ) : null}
          {action === "approveComment" ? (
            <Button
              onClick={() => approveThisComment(commentToAction)}
              autoFocus
            >
              {" "}
              Confirm
            </Button>
          ) : null}

{action === "deleteProduct" ? (
            <Button
              onClick={() => deleteThisProduct(product)}
              autoFocus
            >
              {" "}
              Confirm
            </Button>
          ) : null}

{action === "deleteUser" ? (
            <Button
              onClick={() => deleteThisUser(user)}
              autoFocus
            >
              {" "}
              Confirm
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
      </PortalModal>
  );
};
