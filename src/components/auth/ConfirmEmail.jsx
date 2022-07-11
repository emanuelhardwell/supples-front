import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { startConfirmEmail } from "../../store/slices/auth/authThunk";
import { useDispatch } from "react-redux";
import imageEmail from "../../images/email.png";
import { Link as LinkRouter } from "react-router-dom";
import {
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@mui/material";

export const ConfirmEmail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const email = query.get("email") || "";
  const token = query.get("token") || "";

  useEffect(() => {
    if (email && token) {
      dispatch(startConfirmEmail(email, token));
    }
  }, [email, token, dispatch]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Grid
          container
          sx={{
            alignItems: "center",
            height: "100vh",
            bgcolor: "##BEFFB3",
            padding: "20px",
          }}
        >
          <Grid item xs={12} sm={6}>
            <Typography component="h1" variant="h3" gutterBottom>
              Confirmación de correo electronico.
            </Typography>
            <Link component={LinkRouter} to="/login" variant="h5">
              Iniciar sesión
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardMedia
              // sx={{
              //   height: 600,
              //   width: 600,
              // }}
              component="img"
              image={imageEmail}
              alt="Confirmación de email"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
