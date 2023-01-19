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
    try {
      let response = await getAllComments();
      setComments(response.data);
      setEdit(false);
    } catch (error) {
      console.log(error);
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
        {edit === true ? (
          <>
            <img src={product.url} alt={product.name}></img>
            <div>{product.name}</div>
            <div>{product.description}</div>
            {/* <Rating user={user} product={product} /> */}
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
             <Rating user={user} product={product} /> 
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
