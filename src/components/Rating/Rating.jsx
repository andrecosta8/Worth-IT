import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { updateProduct } from "../../services/apiCalls";

export default function BasicRating({ user, product}) {
  const[readOnly, setReadOnly] = useState(true);
  
  const updateRating = (newValue) => {
   
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
            value={product.overallRating}
            onChange={(event, newValue) => {
              updateRating(newValue);
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
