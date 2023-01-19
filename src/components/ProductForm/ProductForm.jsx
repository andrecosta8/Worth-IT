import React, { useEffect, useState } from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { createNewProduct, updateProduct } from "../../services/apiCalls";
import CloseIcon from '@mui/icons-material/Close';
import { red  } from "@mui/material/colors";


 const ProductForm = ({ productToEdit, toggleForm, getProductsList }) => {
  const [product, setProduct] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (productToEdit) setProduct(productToEdit);
  }, [productToEdit]);

  const handleData = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      rating: "",
    }));
  };

  const createProduct = async (product) => {
    try {
      await createNewProduct(product);
      toggleForm();
      getProductsList();
    } catch (error) {
      setError(error);
    }
  };

  const updateThisProduct = async (product) => {
    try {
      await updateProduct(product);
      toggleForm();
      getProductsList();
    } catch (error) {
      setError(error);
    }
  };
  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 300,
            mx: "auto", // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        > 
          <CloseIcon  onClick={()=> toggleForm()} sx={{ color: red[500], fontSize: 30 }} />
          <div>
            <Typography level="h4" component="h1">
            {productToEdit ? <b>{product.name}</b> : null}
            </Typography>
            {productToEdit ? <Typography level="body2">Please edit this product:</Typography> : <Typography level="body2">Create a new product:</Typography> }
          </div>
          <TextField
            // html input attribute
            type="text"
            name="name"
            label="Name:"
            value={product.name}
            placeholder="Name"
            onChange={(e) => {
              handleData(e);
            }}
          />
            <TextField
            // html input attribute
            type="text"
            name="brand"
            label="Brand:"
            value={product.brand}
            placeholder="Brand"
            onChange={(e) => {
              handleData(e);
            }}
          />
            <TextField
            // html input attribute
            type="text"
            name="model"
            label="Model:"
            value={product.model}
            placeholder="Model"
            onChange={(e) => {
              handleData(e);
            }}
          />
            <TextField
            // html input attribute
            type="text"
            name="description"
            label="Description:"
            value={product.description}
            placeholder="Description"
            onChange={(e) => {
              handleData(e);
            }}
          />
            <TextField
            // html input attribute
            type="text"
            name="url"
            label="Image URL:"
            value={product.url}
            placeholder="Image Url"
            onChange={(e) => {
              handleData(e);
            }}
          />
          {productToEdit ? <Button  onClick={() => {
              updateThisProduct(product);
            }} sx={{ mt: 1 /* margin top */ }}>Edit</Button>  : <Button  onClick={() => {
                createProduct(product);
              }} sx={{ mt: 1 /* margin top */ }}>Create</Button> }
          
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default ProductForm;