
import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function CommentCard({comment}) {
    let filteredDate = (comment.createdAt).split("T");
    let filteredTime = filteredDate[1].split(".")
    let createdAt = filteredDate[0] + " - " + filteredTime[0];
    
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
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}