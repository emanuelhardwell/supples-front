import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../../../helpers/fetch";
import { authCheckingFinish, authLogin, authLogout } from "./authSlice";

export const startLogin = (user) => {
  return async (dispatch) => {
    const res = await fetchWithOutToken("auth/login", user, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(authLogin({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startRegister = (user) => {
  return async (dispatch) => {
    const res = await fetchWithOutToken("auth/create", user, "POST");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(authLogin({ uid: body.uid, name: body.name }));
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};

export const startAuthCheckingFinish = () => {
  return async (dispatch) => {
    const res = await fetchWithToken("auth/renew");
    const body = await res.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(authLogin({ uid: body.uid, name: body.name }));
    } else {
      // Swal.fire("Error", body.message, "error");
      dispatch(authCheckingFinish());
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authLogout());
    // dispatch(postLogout());
  };
};

export const startResetPassword = (email) => {
  return async (dispatch) => {
    const res = await fetchWithOutToken("auth/reset-password", email, "POST");
    const body = await res.json();

    if (body.ok) {
      Swal.fire("Correo enviado", body.message, "success");
    } else {
      Swal.fire("Error", body.message, "error");
    }
  };
};
