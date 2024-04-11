import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from '../pages/Login';
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../features/user/userSlice";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Auth = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const location = useLocation();
  const currentPathname = location.pathname;
  const { isAdmin, isLoading} = useSelector((state) => state?.user?.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isAuthenticated) {
      (async () => {
        try {
          const isAdminRole = await axios?.get(
            `${
              import.meta.env.VITE_USER_API_HOSTNAME
            }validate/check-admin-cookie`,
            {
              withCredentials: true,
            }
          );
  
          dispatch(setUserData({ isAdmin: isAdminRole?.data, isLoading: false } ));
        } catch (err) {
          dispatch(setUserData({ isAdmin: false, isLoading: false }));
            try {
              await axios.get(
                `${import.meta.env.VITE_USER_API_HOSTNAME}user/clearCookies`,
                { withCredentials: true }
              );
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("userDetails");
              navigate("/");
            } catch (error) {
              const errorMessage =
                error?.response?.data?.message ||
                "Internal Server Error. Please try again later.";
            }
        }
      })();
    } else {
      dispatch(setUserData({ isAdmin: false, isLoading: false } ));
    }
  }, [currentPathname]);

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if(isAdmin) {
    return (
      <>
        {
          !["/employees", "/addJobs"]?.includes(currentPathname) ? (
            <Navigate to="/employees" />
          ) : (
            children
          )
        }
      </>
    )
  }

  return isAuthenticated ? (
    !["/", "/employees", "/addJobs"]?.includes(currentPathname) ? (
      children
    ) : (
      <Navigate to="/home" replace />
    )
  ) : (
    currentPathname === "/" ? (
      <Login /> 
    ) : (
      <Navigate to="/" replace /> 
    )
  );
};

export default Auth;
