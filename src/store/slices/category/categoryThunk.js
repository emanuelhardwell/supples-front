import Swal from "sweetalert2";
import { fetchWithToken } from "../../../helpers/fetch";
import {
  categoryAdd,
  categoryDelete,
  categoryGet,
  categoryUpdate,
} from "./categorySlice";

export const startCategoryGet = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("category", {}, "GET");
    const body = await res.json();

    if (body.ok) {
      dispatch(categoryGet(body.categories));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startCategoryAdd = (category) => {
  return async (dispatch) => {
    const res = await fetchWithToken("category", category, "POST");
    const body = await res.json();

    if (body.ok) {
      dispatch(categoryAdd(body.category));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startCategoryDelete = (id) => {
  return async (dispatch) => {
    const res = await fetchWithToken(`category/${id}`, {}, "DELETE");
    const body = await res.json();

    if (body.ok) {
      dispatch(categoryDelete(id));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startCategoryUpdate = (category, id) => {
  return async (dispatch) => {
    const res = await fetchWithToken(`category/${id}`, category, "PUT");
    const body = await res.json();

    if (body.ok) {
      dispatch(categoryUpdate(body.category));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};
