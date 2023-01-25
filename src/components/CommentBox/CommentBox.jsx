import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import React, { useContext, useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import {
  badWords,
  createNewComment,
  updateComment,
} from "../../services/apiCalls";
import { AuthContext } from "../../providers/AuthProvider";
import "./CommentBox.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

export default function CommentBox({
  comment,
  getComments,
  productId,
  toggleCommentBox,
}) {
  const [error, setError] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (comment) {
      setTextAreaValue(comment.body);
    }
  }, [comment]);

  const afterSubmitComment = () => {
    getComments();
    setTextAreaValue("");
    toggleCommentBox();
  };

  const createComment = async () => {
    if (textAreaValue.length === 0) {
      setError("Comment can not be empty");
    } else {
      let badWordCheck = await badWords(textAreaValue);
      const newComment = {
        badWordFlaged: badWordCheck.data,
        body: textAreaValue,
        createdAt: new Date(Date.now()),
        offline: badWordCheck.data,
        productId: productId,
        reported: false,
        user: user.name,
        userID: user.id,
      };
      try {
        await createNewComment(newComment);
        afterSubmitComment();
      } catch (err) {
        setError(err);
        console.error(error);
      }
    }
  };

  const updateThisComment = async () => {
    if (textAreaValue.length === 0) {
      setError("Comment can not be empty");
    } else {
      let badWordCheck = await badWords(textAreaValue);
      const updatedComment = {
        badWordFlaged: badWordCheck.data,
        body: textAreaValue,
        id: comment.id,
        offline: badWordCheck.data,
        reportedCommmentEdit: false,
      };
      try {
        await updateComment(updatedComment);
        afterSubmitComment();
      } catch (err) {
        setError(err);
      }
    }
  };

  return (
    <div className="commentBoxDesign">
      <FormControl sx={{ maxWidth: 500 }} className="formControl">
        <Textarea
          name="commentBody"
          value={textAreaValue}
          onChange={(e) => {
            setTextAreaValue(e.target.value);
          }}
          placeholder="Type something here…"
          minRows={3}
          background-color="white"
          endDecorator={
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              {error && <p className="errorMessage">{error}</p>}
              <IconButton onClick={() => afterSubmitComment()}>
                <Button sx={{ ml: "auto" }}>Cancel</Button>
              </IconButton>
              {comment ? (
                <IconButton
                  onClick={() => {
                    updateThisComment();
                  }}
                >
                  <Button sx={{ ml: "auto" }}>
                    Send
                    <SendIcon />
                  </Button>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    createComment();
                  }}
                >
                  <Button sx={{ ml: "auto" }}>
                    Send
                    <SendIcon />
                  </Button>
                </IconButton>
              )}
            </Box>
          }
          sx={{
            minWidth: 300,
          }}
        />
      </FormControl>
    </div>
  );
}
