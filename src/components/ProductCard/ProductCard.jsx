import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getAllComments } from "../../services/apiCalls";
import CommentCard from "../CommentCard/CommentCard";
import { AuthContext } from '../../providers/AuthProvider';
import HoverRating from "../HoverRating/HoverRating";
import CommentBox from "../CommentBox/CommentBox";
import { useNavigate } from "react-router-dom";



const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const {user} = useContext(AuthContext)
  let navigate = useNavigate();
  
  const getComments = async () => {
    let response = await getAllComments();
    setComments(response.data);
  };

  useEffect(() => {
    getComments()
  },[]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const goDetail = () => {
    setTimeout(() => {
      navigate("/productdetail");
    }, 200);
  };

  return (
    <Card sx={{ width: 650 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon onClick={()=> goDetail()}/>
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
        <CardContent>
          <Typography paragraph>Comments:</Typography>
            {comments.map((comment) => {
                if(comment.productId === product.id && comment.badWordFlaged === false){
                return(
                    <CommentCard comment={comment} getComments={getComments} />
                )}   
            })}
            <br></br>
        <CommentBox product={product} getComments={getComments} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
