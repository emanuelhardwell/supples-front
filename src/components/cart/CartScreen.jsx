import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { Navbar } from "../ui/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { startCartGet } from "../../store/slices/cart/cartThunk";
import { CartTable } from "./CartTable";

export const CartScreen = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(startCartGet());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Paper
          style={{ marginTop: "20px", marginBottom: "20px" }}
          elevation={6}
        >
          <Grid container>
            <Grid item xs={12}>
              <CartTable cartItems={cartItems} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
