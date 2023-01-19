import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";

import {
  badWords,
  createNewComment,
  updateComment,
} from "../../services/apiCalls";
import { AuthContext } from "../../providers/AuthProvider";
import "./CommentBox.css";

export default function CommentBox({
  productId,
  getComments,
  toggleCommentBox,
  comment,
  edit,
}) {
  console.log( productId,
    getComments,
    toggleCommentBox,
    comment,
    edit )
  const [textAreaValue, setTextAreaValue] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (comment) {
      setTextAreaValue(comment.body);
    }
    setUpdate(edit);
  }, [comment, edit]);

  const createComment = async () => {
    if (textAreaValue.length === 0) {
      setError("Comment can not be empty");
    } else {
      let badWordCheck = await badWords(textAreaValue);
      const newComment = {
        body: textAreaValue,
        productId: productId,
        user: user.name,
        userID: user.id,
        reported: false,
        badWordFlaged: badWordCheck.data,
        offline: badWordCheck.data,
        createdAt: new Date(Date.now()),
      };
      try {
        await createNewComment(newComment);
        getComments();
        setTextAreaValue("");
        toggleCommentBox();
      } catch (error) {
        setError(error);
      }
    }
  };

  const updateThisComment = async () => {
    if (textAreaValue.length === 0) {
      setError("Comment can not be empty");
    } else {
      let badWordCheck = await badWords(textAreaValue);
      const updatedComment = {
        body: textAreaValue,
        badWordFlaged: badWordCheck.data,
        offline: badWordCheck.data,
        editedAt: new Date(Date.now()),
        id: comment.id,
        reportedCommmentEdit: false,
      };
      try {
        await updateComment(updatedComment);
        getComments();
        setTextAreaValue("");
        toggleCommentBox();
      } catch (error) {
        setError(error);
      }
    }
  };

  return (
    <div className="commentBoxDesign">
      <FormControl className="formControl">
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
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              {error === null ? (
                "Your Comment"
              ) : (
                <p className="errorMessage">{error}</p>
              )}
              {update === true ? (
                <Button
                  onClick={() => {
                    updateThisComment();
                  }}
                  sx={{ ml: "auto" }}
                >
                  Send
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    createComment();
                  }}
                  sx={{ ml: "auto" }}
                >
                  Send
                </Button>
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
