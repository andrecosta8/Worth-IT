import React, { useContext } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from "react-router-dom";
import { useProductChangeContext } from "../../providers/ProductProvider";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { red } from "@mui/material/colors";


export default function ProductCard({ product, toggleForm, deleteThisProduct }) {
  const {user, admin} = useContext(AuthContext);
  const productSelect = useProductChangeContext();

  let navigate = useNavigate();

  const goDetail = () => {
    setTimeout(() => {
      productSelect(product);
      navigate("/productdetail");
    }, 200);
  };

  return (

  <div className="productCardDesign">
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
        <Button  variant="outlined"  onClick={()=> setTimeout(()=> {toggleForm()},200)} size="small" color="primary">
          Edit
        </Button>
        <Button color="error" variant="contained" onClick={()=> setTimeout(()=> {deleteThisProduct()},200)} size="small" >
          Delete
        </Button> </> : null }
      </CardActions>
    </Card>
  
  </div>
  );
}




