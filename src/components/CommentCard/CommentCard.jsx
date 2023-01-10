
import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { AuthContext } from '../../providers/AuthProvider';
import { deleteComment } from '../../services/apiCalls';

export default function CommentCard({comment}) {
    let filteredDate = (comment.createdAt).split("T");
    let filteredTime = filteredDate[1].split(".")
    let createdAt = filteredDate[0] + " - " + filteredTime[0];
    const { admin, user } = useContext(AuthContext)

    const deleteThisComment = (comment) =>{
      deleteComment(comment);
    }
    
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           {comment.user.charAt(0)}
          </Avatar>
        }
        title={comment.user}
        subheader={createdAt}
      />
      <CardContent>
        <Typography>
         {comment.body}
        </Typography>
      </CardContent>
      {user.id === comment.userID ? 
      <CardActions disableSpacing>
        <IconButton >
          <DeleteIcon onClick={() => deleteThisComment(comment)}/>
        </IconButton>
        <IconButton >
          <EditIcon />
        </IconButton> 
      </CardActions> : 
      <CardActions disableSpacing>
        <IconButton >
          <ThumbUpIcon />
        </IconButton> 
      </CardActions> }
      
    </Card>
  );
}