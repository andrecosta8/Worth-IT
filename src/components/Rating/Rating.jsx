import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({ user, product}) {
  const[readOnly, setReadOnly] = useState(true);
  
  const updateThisRating = (newValue, product, user) => {
  
  };

  const toggleRating = () =>{
    setReadOnly(!readOnly)
  }

  return (
    <>
      {readOnly === true ? (
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating
            name="read-only"
            value={product.overallRating}
            readOnly
          />
          {readOnly === true ? <button onClick={()=> toggleRating()}>Rate this product</button> : null }
        </Box>
      ) : (
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Controlled</Typography>
          <Rating
            name="simple-controlled"
            value=""
            onChange={(event, newValue) => {
              updateThisRating(newValue);
              toggleRating();
            }}
          />
          {readOnly === false ? 
          <button onClick={()=> toggleRating()}>Close</button> 
          : null }
        </Box>
      )}
    </>
  );
}
