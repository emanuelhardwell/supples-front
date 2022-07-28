import Swal from "sweetalert2";
import { fetchWithToken } from "../../../helpers/fetch";
import { cartAdd, cartGet, cartNumber, cartNumberAdd } from "./cartSlice";
import { toast } from "react-toastify";

export const startCartGet = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("cart-item", {}, "GET");
    const body = await res.json();

    if (body.ok) {
      let products = body.cartItems.Products;
      dispatch(cartGet(products));

      if (products.length < 1) {
        dispatch(cartNumber(0));
      } else {
        let num = products
          .map((product) => product.CartItem.quantity)
          .reduce((count, item) => count + item, 0);

        dispatch(cartNumber(num));
      }
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
      dispatch(cartNumberAdd(cartItem.quantity));
      toast("Producto agregado al carrito", {
        type: "success",
        autoClose: 3000,
      });
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};
