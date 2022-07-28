import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { toast } from "react-toastify";
import { startCartAdd } from "../../store/slices/cart/cartThunk";
import { useDispatch } from "react-redux";

const cantidades = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
  {
    id: 6,
    name: "6",
  },
];

export const CartAddProduct = ({ id }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState("");

  const handleClick = (id) => {
    if (quantity < 1 || quantity === "") {
      return toast("Selecciona la cantidad", {
        type: "info",
        autoClose: 3000,
      });
    }
    dispatch(startCartAdd({ productId: id, quantity }));
  };

  return (
    <>
      <FormControl
        sx={{ minWidth: 105, marginRight: "10px", marginBottom: "10px" }}
        size="small"
      >
        <InputLabel id="select-label">Cantidad</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          label="Cantidad"
          name="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          {cantidades.map((quantity) => (
            <MenuItem key={quantity.id} value={quantity.id}>
              {quantity.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        endIcon={<ShoppingCartIcon />}
        onClick={() => handleClick(id)}
      >
        Agregar
      </Button>
    </>
  );
};
