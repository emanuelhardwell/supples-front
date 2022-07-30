import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import {
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startProductGetById } from "../../../store/slices/product/productThunk";
import { Navbar } from "../../ui/Navbar";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { CartAddProduct } from "../../cart/CartAddProduct";
import { numberFormat } from "../../../helpers/numberFormat";

export const ProductOne = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { product } = useSelector((state) => state.product);
  const { rol } = useSelector((state) => state.auth);

  const handleShareLink = () => {
    toast("Link copiado", {
      type: "success",
      autoClose: 3000,
    });
  };

  useEffect(() => {
    params?.id && dispatch(startProductGetById(params.id));
  }, [dispatch, params]);

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
            <Grid item xs={12} sm={7} style={{ marginTop: "25px" }}>
              <CardMedia
                sx={{ objectFit: "contain", p: "10px" }}
                component="img"
                height="500"
                image={product?.imageUrl}
                alt={product?.name}
              />
            </Grid>

            <Grid item xs={12} sm={5} style={{ marginTop: "25px" }}>
              <CardContent>
                <Typography
                  style={{ marginBottom: "15px" }}
                  variant="body1"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {product?.name}
                </Typography>
                <Typography
                  style={{ marginBottom: "10px" }}
                  variant="body2"
                  color="text.secondary"
                >
                  {product?.description}
                </Typography>
                <Typography
                  style={{ marginBottom: "10px" }}
                  variant="body1"
                  color="text.secondary"
                >
                  <strong> {numberFormat(product?.price)} </strong>
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                {rol === "user" && (
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon color="error" />
                  </IconButton>
                )}

                <CopyToClipboard text={window?.location?.href}>
                  <IconButton aria-label="share" onClick={handleShareLink}>
                    <ShareIcon color="primary" />
                  </IconButton>
                </CopyToClipboard>

                <div style={{ marginLeft: "auto" }}>
                  <CartAddProduct id={product?.id} />
                </div>
              </CardActions>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
