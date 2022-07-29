import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Register } from "../components/auth/Register";
import { Login } from "../components/auth/Login";
import { Navigate } from "react-router-dom";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";

import { useDispatch, useSelector } from "react-redux";
import { LoadingRoller } from "../components/loaders/LoadingRoller";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Home } from "../components/home/Home";
import { startAuthCheckingFinish } from "../store/slices/auth/authThunk";
import { ResetPassword } from "../components/auth/ResetPassword";
import { UpdatePassword } from "../components/auth/UpdatePassword";
import { ConfirmEmail } from "../components/auth/ConfirmEmail";
import { CategoryScreen } from "../components/admin/category/CategoryScreen";
import { ProductScreen } from "../components/admin/product/ProductScreen";
import { ProductOne } from "../components/admin/product/ProductOne";
import { CartScreen } from "../components/cart/CartScreen";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { uid, checking, rol } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startAuthCheckingFinish());
  }, [dispatch]);

  if (checking) {
    return <LoadingRoller />;
  }

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRouter isAuthenticated={!!uid}>
                  <Login />
                </PublicRouter>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRouter isAuthenticated={!!uid}>
                  <Register />
                </PublicRouter>
              }
            />

            <Route
              path="/reset-password"
              element={
                <PublicRouter isAuthenticated={!!uid}>
                  <ResetPassword />
                </PublicRouter>
              }
            />

            <Route
              path="/update-password"
              element={
                <PublicRouter isAuthenticated={!!uid}>
                  <UpdatePassword />
                </PublicRouter>
              }
            />

            <Route
              path="/confirm"
              element={
                <PublicRouter isAuthenticated={!!uid}>
                  <ConfirmEmail />
                </PublicRouter>
              }
            />

            <Route
              path="/"
              element={
                <PrivateRouter isAuthenticated={!!uid}>
                  <Home />
                </PrivateRouter>
              }
            />

            <Route
              path="/product/:id"
              element={
                <PrivateRouter isAuthenticated={!!uid}>
                  <ProductOne />
                </PrivateRouter>
              }
            />

            <Route
              path="/cart"
              element={
                <PrivateRouter isAuthenticated={!!uid}>
                  <CartScreen />
                </PrivateRouter>
              }
            />

            {rol === "admin" && (
              <>
                <Route
                  path="/admin/category"
                  element={
                    <PrivateRouter isAuthenticated={!!uid}>
                      <CategoryScreen />
                    </PrivateRouter>
                  }
                />

                <Route
                  path="/admin/product"
                  element={
                    <PrivateRouter isAuthenticated={!!uid}>
                      <ProductScreen />
                    </PrivateRouter>
                  }
                />
              </>
            )}

            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
