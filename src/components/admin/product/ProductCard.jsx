import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Grid } from "@mui/material";
import { ProductDelete } from "./ProductDelete";
import { ProductUpdate } from "./ProductUpdate";

import dayjs from "dayjs";
import "dayjs/locale/es"; // carga bajo demanda
dayjs.locale("es"); // usar la configuración regional española globalmente

export const ProductCard = ({ product }) => {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ maxWidth: 345 }} elevation={6}>
          <CardMedia
            sx={{ maxWidth: "100%", maxHeight: "100%" }}
            component="img"
            height="200"
            image={product?.imageUrl}
            alt="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              fontWeight="bold"
            >
              {product?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {product?.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>$ {product?.price} </strong>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <div style={{ marginLeft: "auto" }}>
              <ProductDelete id={product?.id} />
              <ProductUpdate product={product} />
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
