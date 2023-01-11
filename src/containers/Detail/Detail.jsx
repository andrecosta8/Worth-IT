import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useProductContext } from "../../providers/ProductProvider";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HoverRating from "../../components/HoverRating/HoverRating";
import { AuthContext } from "../../providers/AuthProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExpandMore } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentCard from "../../components/CommentCard/CommentCard";
import CommentBox from "../../components/CommentBox/CommentBox";
import { deleteProduct, getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./Detail.css";
const Detail = () => {
  const product = useProductContext();
  const { user, admin } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false)
  const [commentToEdit, setCommentToEdit]= useState({})
  let navigate = useNavigate()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getComments = async () => {
    let response = await getAllComments();
    setComments(response.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  const deleteThisProduct = (product) => {
    deleteProduct(product);
    navigate("/products")
  };

  const isEditing = (editingComment) => {
    console.log(editingComment, "HERE")
    setCommentToEdit(editingComment);
    setEdit(true)
  }

  return (
    <div className="detailProductDesign">
      <Card sx={{ width: 650 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={product.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={product.url}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <HoverRating rating={product.rating} />
          {admin !== null ? (
            <IconButton>
              <DeleteIcon onClick={() => deleteThisProduct(product)} />
            </IconButton>
          ) : null}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {edit === true ?<CardContent>
            <Typography paragraph>Comments:</Typography>
            <CommentCard comment={commentToEdit} getComments={getComments}/>
            <CommentBox product={product} getComments={getComments} />
          </CardContent> :<CardContent>
            <Typography paragraph>Comments:</Typography>
            {comments.map((comment) => {
              if (
                comment.productId === product.id &&
                comment.badWordFlaged === false
              ) {
                return (
                  <CommentCard isEditing={isEditing} comment={comment} getComments={getComments} />
                );
              }
            })}
            <br></br>
            <CommentBox product={product} getComments={getComments} />
          </CardContent> }
          
        </Collapse>
      </Card>
    </div>
  );
};

export default Detail;
