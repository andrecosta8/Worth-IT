import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Stack } from '@mui/joy';


export const BasicRating = ({product}) => {

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Stack >
      <Rating name="half-rating-read" value={product.rating} precision={0.5} readOnly />
    </Stack>
    </Box>
  );
}