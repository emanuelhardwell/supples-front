import { Container, CssBaseline, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { startProductGetByPopulation } from "../../store/slices/product/productThunk";
import { ProductSearch } from "../admin/product/ProductSearch";
import { ProductCard } from "../admin/product/ProductCard";
import { ProductPagination } from "../admin/product/ProductPagination";
import { ProductNotFound } from "../admin/product/ProductNotFound";
import { Navbar } from "../ui/Navbar";

export const Home = () => {
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
  // const searchQuery = query.get("name") || "";
  const initialState = query.get("name") || "";
  const [searchQuery, setSearchQuery] = useState(initialState);

  useEffect(() => {
    dispatch(startProductGetByPopulation(page, searchQuery));
  }, [dispatch, page, searchQuery]);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container sx={{ pt: 3 }}>
          <Grid item xs={12} sm={12}>
            <ProductSearch
              setSearchQuery={setSearchQuery}
              page={page}
              initialState={initialState}
            />
          </Grid>
        </Grid>

        <Grid container sx={{ py: 2 }} spacing={1}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>

        <Grid container sx={{ py: 2 }}>
          <Grid item xs={12}>
            {numberOfPages && currentPage && (
              <ProductPagination
                numberOfPages={numberOfPages}
                currentPage={currentPage}
                searchQuery={searchQuery}
              />
            )}
          </Grid>

          {numberOfPages < 1 && (
            <Grid item xs={12}>
              <ProductNotFound />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
