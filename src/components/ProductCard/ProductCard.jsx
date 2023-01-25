import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Alert } from "../Alert/Alert";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProductChangeContext } from "../../providers/ProductProvider";

export default function ProductCard({
  deleteThisProduct,
  product,
  toggleForm,
}) {
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const productSelect = useProductChangeContext();

  const goDetail = () => {
    setTimeout(() => {
      productSelect(product);
      navigate("/productdetail");
    }, 200);
  };

  const handleClickOpen = (actionToDo) => {
    setAction(actionToDo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (
    <div className="productCardDesign">
      <Alert
        action={action}
        handleClose={handleClose}
        deleteThisProduct={deleteThisProduct}
        product={product}
        open={open}
      />

      <Card sx={{ width: 375, margin: 3}}>
        <CardActionArea
        sx={{display:"flex", justifyContent: "center", flexDirection: "column", marginTop:1}}>
          <CardMedia
            component="img"
            height="200"
            width="250"
            image={product.url}
            alt={product.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {product.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{display:"flex", justifyContent: "center"}}>
          <Button
            variant="contained"
            onClick={() =>
              setTimeout(() => {
                goDetail();
              }, 200)
            }
            size="small"
            color="primary"
          >
            <KeyboardArrowUpIcon />
            See Details
          </Button>
          {toggleForm && deleteThisProduct && (
            <>
              <Button
                variant="outlined"
                onClick={() =>
                  setTimeout(() => {
                    toggleForm(product);
                  }, 200)
                }
                size="small"
                color="primary"
              >
                <EditIcon />
                Edit
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() =>
                  setTimeout(() => {
                    handleClickOpen("deleteProduct");
                  }, 200)
                }
                size="small"
              >
                <DeleteIcon />
                Delete
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </div>
  );
}
