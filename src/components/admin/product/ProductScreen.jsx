import {
  Container,
  CssBaseline,
  Grid,
  Pagination,
  PaginationItem,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startProductGetByPopulation,
  startProductGetCategories,
} from "../../../store/slices/product/productThunk";
import { Navbar } from "../../ui/Navbar";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";
import { useLocation, Link } from "react-router-dom";

export const ProductScreen = () => {
  const dispatch = useDispatch();
  const { products, currentPage, numberOfPages } = useSelector(
    (state) => state.product
  );
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();
  const page = query.get("page") || 1;

  useEffect(() => {
    dispatch(startProductGetByPopulation(page));
    dispatch(startProductGetCategories());
  }, [dispatch, page]);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Grid container sx={{ pt: 3 }}>
          <ProductForm />
        </Grid>

        <Grid container sx={{ py: 2 }} spacing={1}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>

        <Grid container sx={{ py: 2 }}>
          <Grid item xs={12}>
            {numberOfPages && currentPage && (
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                count={numberOfPages}
                page={currentPage}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`${item.page === 1 ? "" : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
