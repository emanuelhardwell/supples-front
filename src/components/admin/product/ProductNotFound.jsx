import { CardMedia, Typography } from "@mui/material";
import React from "react";
import productNotFound from "../../../images/not-found-product.gif";

export const ProductNotFound = () => {
  return (
    <>
      <Typography variant="h6" textAlign="center">
        No se encontro ningun producto
      </Typography>
      <CardMedia
        sx={{ objectFit: "contain", p: "10px" }}
        component="img"
        height="350"
        image={productNotFound}
        alt="product not found"
      />
    </>
  );
};
