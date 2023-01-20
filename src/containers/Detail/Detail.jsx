import "./Detail.css";
import CommentBox from "../../components/CommentBox/CommentBox";
import CommentCard from "../../components/CommentCard/CommentCard";
import { AuthContext } from "../../providers/AuthProvider";
import { getAllComments } from "../../services/apiCalls";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../../providers/ProductProvider";

const Detail = () => {
  const [commentBox, setCommentBox] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState({});
  const [comments, setComments] = useState([]);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const product = useProductContext();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    if (!user) navigate("/");
  });

  const getComments = async () => {
    try {
      let response = await getAllComments();
      setComments(response.data);
      setEdit(false);
    } catch (error) {
      setError(error);
    }
  };

  const toggleCommentBox = () => {
    setCommentBox(!commentBox);
  };

  const isEditing = (editingComment) => {
    setCommentToEdit(editingComment);
    toggleCommentBox();
    setEdit(true);
  };

  const isNotEditing = () => {
    setCommentToEdit(null)
    toggleCommentBox()
    setEdit(false)
  }

  return (
    <div className="detailProductDesign">
      <div class="wave"></div><div class="wave"></div><div class="wave"></div>
      <div className="lefside">
        {edit ? (
          <>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <button onClick={()=> isNotEditing()}>Close</button>
            <CommentBox
              comment={commentToEdit}
              toggleCommentBox={toggleCommentBox}
              productId={product.id}
              getComments={getComments}
              edit={edit}
            />
          </>
        ) : (
          <>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.description}</div> 
            {commentBox === false ? (
              <button onClick={() => toggleCommentBox()}>
                Create new comment
              </button>
            ) : (
              <button onClick={() => toggleCommentBox()} >Close</button>
            )}
            {commentBox === true ? (
              <CommentBox
                comment={commentToEdit}
                toggleCommentBox={toggleCommentBox}
                productId={product.id}
                getComments={getComments}
                edit={edit}
              />
            ) : null}
          </>
        )}
      </div>
      <div className="rightside">
        {comments.sort((a,b)=> b.createdAt > a.createdAt ? 1:-1).map((comment) => {
          if (
            comment.productId === product.id &&
            comment.offline === false
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
