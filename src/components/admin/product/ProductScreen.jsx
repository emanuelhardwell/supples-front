import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Pagination,
  PaginationItem,
  TextField,
  Typography,
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
import { useLocation, Link, useNavigate } from "react-router-dom";

export const ProductScreen = () => {
  const dispatch = useDispatch();
  const { products, currentPage, numberOfPages } = useSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const location = useLocation();
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };
  const query = useQuery();
  const page = query.get("page") || 1;
  // const searchQuery = query.get("name") || "";
  const initialState = query.get("name") || "";
  const [search, setSearch] = useState(initialState);
  const [searchQuery, setSearchQuery] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    if (page === 1 && search === "") {
      navigate(``);
    } else if (page !== 1 && search === "") {
      navigate(`?page=${page}`);
    } else if (page === 1 && search !== "") {
      navigate(`?name=${search}`);
    } else if (page !== 1 && search !== "") {
      navigate(`?page=${page}&name=${search}`);
    }
  };

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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "center" },
              }}
            >
              <ProductForm />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "center" },
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  mt: -1,
                  "& .MuiTextField-root": { marginY: 1, width: "100%" },
                  "& .MuiFormControl-root": { marginY: 1, width: "100%" },
                }}
              >
                <TextField
                  size="small"
                  label="Buscar"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
            </Box>
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
              <Typography variant="h6" textAlign="center">
                No se encontro ningun producto
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
