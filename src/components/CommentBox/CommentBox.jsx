import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import { badWords, createNewComment, updateComment } from "../../services/apiCalls";
import { AuthContext } from "../../providers/AuthProvider";


export default function CommentBox({ product, getComments, toggleCommentBox, comment }) {
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState("normal");
  const [anchorEl, setAnchorEl] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    if (comment) setTextAreaValue(comment.body);
  },[comment])

  const createComment = async () => {
    let badWordCheck = await badWords(textAreaValue);
    const newComment = {
      body: textAreaValue,
      productId: product.id,
      user: user.name,
      userID: user.id,
      reported: false,
      badWordFlaged: badWordCheck.data,
      createdAt: new Date(Date.now()),
    };
    await createNewComment(newComment);
    getComments();
    setTextAreaValue("");
    toggleCommentBox();
  };

  const updateThisComment = async() => {
    let badWordCheck = await badWords(textAreaValue);
    const updatedComment = {
      body: textAreaValue,
      badWordFlaged: badWordCheck.data,
      reported: false,
      editedAt: new Date(Date.now()),
      id: comment.id,
    }
    await updateComment(updatedComment)
    getComments();
    setTextAreaValue("");
    toggleCommentBox();
  }

  return (
    <FormControl>
      <FormLabel>Your comment</FormLabel>
      <Textarea
        name="commentBody"
        value={textAreaValue}
        onChange={(e) => {
          setTextAreaValue(e.target.value);
        }}
        placeholder="Type something here…"
        minRows={3}
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
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ "--List-decorator-size": "24px" }}
            >
              {["200", "normal", "bold"].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItemDecorator>
                  {weight === "200" ? "lighter" : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? "soft" : "plain"}
              color={italic ? "primary" : "neutral"}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            {comment ? <Button
              onClick={() => {
                updateThisComment();
              }}
              sx={{ ml: "auto" }}
            >
              Send
            </Button> : <Button
              onClick={() => {
                createComment();
              }}
              sx={{ ml: "auto" }}
            >
              Send
            </Button>}
        
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? "italic" : "initial",
        }}
      />
    </FormControl>
  );
}
