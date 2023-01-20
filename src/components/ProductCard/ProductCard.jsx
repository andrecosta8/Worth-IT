import React, { useContext, useState } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useProductChangeContext } from "../../providers/ProductProvider";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { red } from "@mui/material/colors";
import { Alert } from "../Alert/Alert";


export default function ProductCard({ product, toggleForm, deleteThisProduct }) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const {user, admin} = useContext(AuthContext);
  const productSelect = useProductChangeContext();

  let navigate = useNavigate();

  const goDetail = () => {
    setTimeout(() => {
      productSelect(product);
      navigate("/productdetail");
    }, 200);
  };

  const handleClickOpen = (actionToDo, comment) => {
    setAction(actionToDo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (

  <div className="productCardDesign">
    <Alert action={action} handleClose={handleClose} deleteThisProduct={deleteThisProduct} product={product} open={open}/>
    <Card className="productCard" >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {product.url} 
          alt={product.name}
          onClick={()=> setTimeout(()=> {goDetail()},200)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button  variant="contained" onClick={()=> setTimeout(()=> {goDetail()},200)} size="small" color="primary">
          See Details
        </Button>
        {toggleForm  && deleteThisProduct ? 
        <>
        <Button  variant="outlined"  onClick={()=> setTimeout(()=> {toggleForm(product)},200)} size="small" color="primary">
          Edit
        </Button>
        <Button color="error" variant="contained" onClick={()=> setTimeout(()=> {handleClickOpen("deleteProduct")},200)} size="small" >
          Delete
        </Button> </> : null }
      </CardActions>
    </Card>
  
  </div>
  );
}




