import {
  Container,
  CssBaseline,
  Grid,
  Pagination,
  PaginationItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startProductGetByPopulation,
  startProductGetCategories,
} from "../../../store/slices/product/productThunk";
import { Navbar } from "../../ui/Navbar";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";
import { useLocation, Link } from "react-router-dom";
import { ProductSearch } from "./ProductSearch";
import { ProductNotFound } from "./ProductNotFound";

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
  // const searchQuery = query.get("name") || "";
  const initialState = query.get("name") || "";
  const [searchQuery, setSearchQuery] = useState(initialState);

  useEffect(() => {
    dispatch(startProductGetCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(startProductGetByPopulation(page, searchQuery));
  }, [dispatch, page, searchQuery]);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid container sx={{ pt: 3 }}>
          <Grid item xs={12} sm={6}>
            <ProductForm />
          </Grid>

          <Grid item xs={12} sm={6}>
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
              <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                count={numberOfPages}
                page={currentPage}
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`${
                      item.page === 1 && searchQuery === ""
                        ? ""
                        : item.page !== 1 && searchQuery === ""
                        ? `?page=${item.page}`
                        : item.page === 1 && searchQuery !== ""
                        ? `?name=${searchQuery}`
                        : `?page=${item.page}&name=${searchQuery}`
                    }`}
                    {...item}
                  />
                )}
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
