import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchWithToken, fetchWithTokenAndFile } from "../../../helpers/fetch";
import {
  productAdd,
  productDelete,
  productGet,
  productGetByPopulation,
  productGetCategories,
  productUpdate,
} from "./productSlice";

export const startProductGet = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("product", {}, "GET");
    const body = await res.json();

    if (body.ok) {
      dispatch(productGet(body.products));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startProductGetByPopulation = (page = 1) => {
  return async (dispatch) => {
    const res = await fetchWithToken(
      `product/products?page=${page}`,
      {},
      "GET"
    );
    const body = await res.json();

    if (body.ok) {
      dispatch(
        productGetByPopulation({
          products: body.products,
          currentPage: body.currentPage,
          numberOfPages: body.numberOfPages,
        })
      );
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startProductAdd = (product) => {
  return async (dispatch) => {
    const res = await fetchWithTokenAndFile("product", product, "POST");
    const body = await res.json();

    if (body.ok) {
      dispatch(productAdd(body.product));
      toast(body.message, {
        type: "success",
        autoClose: 4000,
      });
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startProductDelete = (id) => {
  return async (dispatch) => {
    const res = await fetchWithToken(`product/${id}`, {}, "DELETE");
    const body = await res.json();

    if (body.ok) {
      dispatch(productDelete(id));
      toast(body.message, {
        type: "success",
        autoClose: 4000,
      });
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startProductUpdate = (product, id) => {
  return async (dispatch) => {
    const res = await fetchWithTokenAndFile(`product/${id}`, product, "PUT");
    const body = await res.json();

    if (body.ok) {
      dispatch(productUpdate(body.product));
      toast(body.message, {
        type: "success",
        autoClose: 4000,
      });
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startProductGetCategories = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("category", {}, "GET");
    const body = await res.json();

    if (body.ok) {
      dispatch(productGetCategories(body.categories));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};
