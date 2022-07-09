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

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { uid, checking } = useSelector((state) => state.auth);

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
              path="/"
              element={
                <PrivateRouter isAuthenticated={!!uid}>
                  <Home />
                </PrivateRouter>
              }
            />

            {/* <PrivateRouter
              exact
              path="/"
              element={<Home />}
              isAuthenticated={!!uid}
            /> */}

            {/* <PublicRouter
              exact
              path="/login"
              element={<Login />}
              isAuthenticated={!!uid}
            /> */}

            {/* <PublicRouter
              exact
              path="/register"
              element={<Register />}
              isAuthenticated={!!uid}
            /> */}

            {/* <Navigate to="/" /> */}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
