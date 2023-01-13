import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { updateProduct } from "../../services/apiCalls";

export default function BasicRating({user, product}) {
  const [value, setValue] = useState("");
  console.log(user.id, product.id, value) 

  
    const updateRating = () => {
        updateProduct({
            ratingValues: {
                userID: user.id,
                rating: value
            }
        })

    }
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </Box>
  );
}