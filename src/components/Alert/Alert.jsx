import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ReactDOM from "react-dom";

const PortalModal = ({ children, wrapperId }) => {
  return ReactDOM.createPortal(children, document.getElementById(wrapperId));
};
export const Alert = ({
  action,
  approveThisComment,
  commentToAction,
  deleteThisComment,
  deleteThisProduct,
  deleteThisUser,
  handleClose,
  open,
  product,
  user,
}) => {
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
          {action === "deleteComment" && (
            <Button
              onClick={() => deleteThisComment(commentToAction)}
              autoFocus
            >
              {" "}
              Confirm
            </Button>
          )}
          {action === "approveComment" && (
            <Button
              onClick={() => approveThisComment(commentToAction)}
              autoFocus
            >
              {" "}
              Confirm
            </Button>
          )}

          {action === "deleteProduct" && (
            <Button onClick={() => deleteThisProduct(product)} autoFocus>
              {" "}
              Confirm
            </Button>
          )}

          {action === "deleteUser" && (
            <Button onClick={() => deleteThisUser(user)} autoFocus>
              {" "}
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </PortalModal>
  );
};
