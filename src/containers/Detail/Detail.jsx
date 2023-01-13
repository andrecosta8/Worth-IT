import { AuthContext } from "../../providers/AuthProvider";
import { getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./Detail.css";
import { useProductContext } from "../../providers/ProductProvider";
import { useContext, useEffect, useState } from "react";
import CommentCard from "../../components/CommentCard/CommentCard";
import CommentBox from "../../components/CommentBox/CommentBox";

const Detail = () => {
  const product = useProductContext();
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState(false);

  const { user, admin } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});

  let navigate = useNavigate();

  const getComments = async () => {
    let response = await getAllComments();
    setComments(response.data);
    setEdit(false);
  };

  useEffect(() => {
    getComments();
  }, []);

  const openCommentBox = () => {
    setCommentBox(!commentBox);
  };

  // const deleteThisProduct = (product) => {
  //   deleteProduct(product);
  //   navigate("/products");
  // };

  const isEditing = (editingComment) => {
    setCommentToEdit(editingComment);
    setEdit(true);
  };

  return (
    <div className="detailProductDesign">
      <div className="lefside">
        {edit === true ? (
          <>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.rating}</div>
            <CommentBox
              comment={commentToEdit}
              openCommentBox={openCommentBox}
              product={product}
              getComments={getComments}
            />
          </>
        ) : (
          <>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.rating}</div>
            {commentBox === false ? (
              <button onClick={() => openCommentBox()}>
                Create new comment
              </button>
            ) : (
              <button onClick={() => openCommentBox()}>Close</button>
            )}
            {commentBox === true ? (
              <CommentBox
                openCommentBox={openCommentBox}
                product={product}
                getComments={getComments}
              />
            ) : null}
          </>
        )}
      </div>
      <div className="rightside">
        {comments.map((comment) => {
          if (
            comment.productId === product.id &&
            comment.badWordFlaged === false && comment.reported === false
          ) {
            return (
              <CommentCard
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

//
// {edit === true ?<CardContent>
//   <Typography paragraph>Comments:</Typography>
//   <CommentCard comment={commentToEdit} getComments={getComments}/>
//   <CommentBox product={product} getComments={getComments} />
// </CardContent> :<CardContent>
//   <Typography paragraph>Comments:</Typography>

//   <br></br>
//   <CommentBox product={product} getComments={getComments} />
// </CardContent> }

{
  /* <IconButton>
<DeleteIcon onClick={() => deleteThisProduct(product)} />
</IconButton> */
}
