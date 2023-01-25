import "./Detail.css";
import CommentBox from "../../components/CommentBox/CommentBox";
import CommentCard from "../../components/CommentCard/CommentCard";
import { AuthContext } from "../../providers/AuthProvider";
import { getAllComments } from "../../services/apiCalls";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../providers/ProductProvider";
import { Button} from "@mui/material";
import { BasicRating } from "../../components/BasicRating/BasicRating";


const Detail = () => {
  const [commentBox, setCommentBox] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const element = document.getElementById('scrollup');
  const navigate = useNavigate();
  const product = useProductContext();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getComments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user === null) navigate("/");
  });

  const getComments = async () => {
    try {
      let response = await getAllComments();
      setComments(response.data);
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };

  const toggleCommentBox = () => {
    setCommentBox(!commentBox);
  };

  const isCreating = () => {
    setCommentToEdit("");
    toggleCommentBox();
  }

  const isEditing = (editingComment) => {
    element.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    toggleCommentBox();
    setCommentToEdit(editingComment);
  };

  
  return (
    <div className="detailProductDesign">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
        <div  className="lefside">
          <div className="productDetail">
            <div className="product-name">{product.name}</div>
            <img className="product-image" src={product.url} alt={product.name}></img>
            <div className="brand-and-model">
            <div className="product-brand"><b>Brand: </b> {product.brand}</div>
            <div className="product-model"><b>Model: </b> {product.model}</div>
            </div>
            <BasicRating product={product} />
            
            <div className="product-description"><b>Description:</b> {product.description}</div>
          </div>
          
        </div>
      <div id="scrollup" className="rightside">
      {commentBox ? (
            <CommentBox 
              comment={commentToEdit}
              toggleCommentBox={toggleCommentBox}
              productId={product.id}
              getComments={getComments}
            />
          ) : <Button
          className="createNewCommentButton"
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            setTimeout(() => {
              isCreating();
            }, 250)
          }
        >
          Create New Comment
        </Button>}
        {comments
          .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
          .map((comment) => {
            if (comment.productId === product.id && comment.offline === false) {
              return (
                <CommentCard
                  key={comment.id}
                  isEditing={isEditing}
                  comment={comment}
                  getComments={getComments}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default Detail;
