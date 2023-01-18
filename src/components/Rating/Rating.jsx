import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { updateRating, createRating } from "../../services/apiCalls";

export default function BasicRating({ user, product }) {
  const [readOnly, setReadOnly] = useState(true);

  const toggleRating = () => {
    setReadOnly(!readOnly);
  };

  // const updateThisRating = async (newValue, product, user) => {
  //   let createthisRating = {
  //         id: product.id,
  //         ratings: 
  //           {
  //             userID: user.id,
  //             userRating: newValue,
  //           },
  //         }
  //   createRating(createthisRating)
  //   // let updatedRating = {
  //   //   id: product.id,
  //   //   ratings: 
  //   //     {
  //   //       userID: user.id,
  //   //       userRating: newValue,
  //   //     },
  //   // };
  //   // console.log(product.ratings.userID, user.id)
  //   // if (product.ratings.userID === user.id) {
  //   //   await updateRating(updatedRating);
  //   // } else {
  //   //   let createthisRating = {
  //   //     id: product.id,
  //   //     ratings: 
  //   //       {
  //   //         userID: user.id,
  //   //         userRating: newValue,
  //   //       },
  //   //   };
  //   //   await createRating(createthisRating);
  //   // }
  // };

  return (
    <>
      {readOnly === true ? (
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Rating</Typography>
          <Rating name="read-only" value={product.overallRating} readOnly />
          {readOnly === true ? (
            <button onClick={() => toggleRating()}>Rate this product</button>
          ) : null}
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
              toggleRating();
              // updateThisRating(newValue, product, user);
            }}
          />
          {readOnly === false ? (
            <button onClick={() => toggleRating()}>Close</button>
          ) : null}
        </Box>
      )}
    </>
  );
}
