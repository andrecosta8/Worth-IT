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

export default function CommentBox({
  comment,
  edit,
  getComments,
  productId,
  toggleCommentBox,
}) {
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
        badWordFlaged: badWordCheck.data,
        body: textAreaValue,
        id: comment.id,
        offline: badWordCheck.data,
        reportedCommmentEdit: false,
      };
      try {
        await updateComment(updatedComment);
        afterSubmitComment();
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
              {error && <p className="errorMessage">{error}</p>}

              <Button sx={{ ml: "auto" }} onClick={() => toggleCommentBox()}>
                {" "}
                Cancel
              </Button>
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
