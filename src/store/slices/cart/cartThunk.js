import Swal from "sweetalert2";
import { fetchWithToken } from "../../../helpers/fetch";
import {
  cartAdd,
  cartGet,
  cartQuantityAdd,
  cartQuantityGet,
} from "./cartSlice";
import { toast } from "react-toastify";

export const startCartQuantityGet = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("cart-item/quantity", {}, "GET");
    const body = await res.json();

    if (body.ok) {
      dispatch(cartQuantityGet(body.cartItems));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startCartGet = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("cart-item", {}, "GET");
    const body = await res.json();

    if (body.ok) {
      dispatch(cartGet(body.cartItems.Products));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startCartAdd = (cartItem) => {
  return async (dispatch) => {
    const res = await fetchWithToken("cart-item", cartItem, "POST");
    const body = await res.json();

    if (body.ok) {
      console.log(body);
      dispatch(cartAdd(body.cartItem.Products[0]));
      dispatch(cartQuantityAdd(cartItem.quantity));
      toast("Producto agregado al carrito", {
        type: "success",
        autoClose: 3000,
      });
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};
