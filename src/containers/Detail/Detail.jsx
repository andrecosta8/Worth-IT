import { AuthContext } from "../../providers/AuthProvider";
import { getAllComments } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import "./Detail.css";
import { useProductContext } from "../../providers/ProductProvider";
import { useContext, useEffect, useState } from "react";
import CommentCard from "../../components/CommentCard/CommentCard";
import CommentBox from "../../components/CommentBox/CommentBox";
import Rating from "../../components/Rating/Rating";

const Detail = () => {
  const product = useProductContext();
  const [comments, setComments] = useState([]);
  const [commentBox, setCommentBox] = useState(false);
  const [edit, setEdit] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const { user, admin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (user === null) navigate("/");
  });

  const getComments = async () => {
    let response = await getAllComments();
    setComments(response.data);
    setEdit(false);
  };

  const toggleCommentBox = () => {
    setCommentBox(!commentBox);
  };

  const isEditing = (editingComment) => {
    setCommentToEdit(editingComment);
    toggleCommentBox();
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
            <Rating user={user} product={product} />
            <CommentBox
              comment={commentToEdit}
              toggleCommentBox={toggleCommentBox}
              product={product}
              getComments={getComments}
            />
          </>
        ) : (
          <>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <Rating user={user} product={product} />
            {commentBox === false ? (
              <button onClick={() => toggleCommentBox()}>
                Create new comment
              </button>
            ) : (
              <button onClick={() => toggleCommentBox()}>Close</button>
            )}
            {commentBox === true ? (
              <CommentBox
                toggleCommentBox={toggleCommentBox}
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
            comment.badWordFlaged === false &&
            comment.reported === false
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

