import Button from "@mui/joy/Button";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import Sheet from "@mui/joy/Sheet";
import TextField from "@mui/joy/TextField";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider} from "@mui/joy";
import { createNewProduct, updateProduct } from "../../services/apiCalls";
import { red } from "@mui/material/colors";

const ProductForm = ({ productToEdit, toggleForm, getProductsList }) => {
  const [error, setError] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    if (productToEdit) setProduct(productToEdit);
  }, [productToEdit]);

  const handleData = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createProduct = (product) => {
    try {
      createNewProduct(product);
      toggleForm();
      getProductsList();
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const updateThisProduct = (product) => {
    try {
      updateProduct(product);
      toggleForm();
      getProductsList();
    } catch (err) {
      setError(err);
      console.error(error);
    }
  };
  return (
    <CssVarsProvider>
    <main>
      <Sheet
        sx={{
          borderRadius: "sm",
          boxShadow: "md",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mx: "auto", // margin left & right
          my: 4, // margin top & botom
          px: 2, // padding left & right
          py: 3, // padding top & bottom
          width: 300,
        }}
        variant="outlined"
      >
        <CloseIcon
          onClick={() => toggleForm()}
          sx={{ color: red[500], fontSize: 30 }}
        />
        <div>
          <Typography level="h4" component="h1">
            {productToEdit && <b>{product.name}</b>}
          </Typography>
          {productToEdit ? (
            <Typography level="body2">Please edit this product:</Typography>
          ) : (
            <Typography level="body2">Create a new product:</Typography>
          )}
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
          type="number"
          name="rating"
          label="Rating:"
          value={product.rating}
          placeholder="Rating"
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
        {productToEdit ? (
          <Button
            onClick={() => {
              updateThisProduct(product);
            }}
            sx={{ mt: 1 /* margin top */ }}
          >
            Edit
          </Button>
        ) : (
          <Button
            onClick={() => {
              createProduct(product);
            }}
            sx={{ mt: 1 /* margin top */ }}
          >
            Create
          </Button>
        )}
      </Sheet>
    </main>
    </CssVarsProvider>
  );
};

export default ProductForm;
