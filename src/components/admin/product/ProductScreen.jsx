import { Container, CssBaseline, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startProductGet,
  startProductGetCategories,
} from "../../../store/slices/product/productThunk";
import { Navbar } from "../../ui/Navbar";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";

export const ProductScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(startProductGet());
    dispatch(startProductGetCategories());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Grid container sx={{ pt: 3 }}>
          <ProductForm />
        </Grid>

        <Grid container sx={{ py: 2 }} spacing={2}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    </>
  );
};
