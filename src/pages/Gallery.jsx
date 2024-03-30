import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import authHeader from "../utility/authHeader";
import CustomSnackBar from "../components/CustomSnackBar";
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [apiError, setApiError] = useState(null);
  const currentUserDetails = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : "";
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_USER_API_HOSTNAME}user/getImage/${
            currentUserDetails?.email
          }`,
          { withCredentials: true }
        );
        const images = result?.data;
        setGalleryImages(images);
      } catch (error) {
        if (error?.response?.status == 401) {
          setApiError("You are not authorized to access this resource");
          setTimeout(() => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userDetails");
            navigate("/");
          }, 2000);
        } else if (error?.response?.status == 403) {
          setApiError(error?.response?.data?.message || "Session Expired");
          setTimeout(async() => {
            await axios.get(
              `${import.meta.env.VITE_USER_API_HOSTNAME}user/clearCookies`,
              { withCredentials: true }
            );
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userDetails");
            navigate("/");
          }, 2000);
        } else {
          setApiError(
            error?.response?.data?.message ||
              "Network Request Failed. Please try again later"
          );
        }
      }
    })();
  }, []);

  return (
    <>
      <h1>Gallery</h1>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {galleryImages?.map((image, index) => {
          return (
            <Grid
              item
              xs={1}
              sm={4}
              md={4}
              key={index}
              sx={{ height: "300px" }}
            >
              <img
                src={`${import.meta.env.VITE_USER_API_HOSTNAME}${image?.path}`}
                alt={"gallery image"}
                width={"100%"}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      {apiError && (
        <CustomSnackBar
          isOpen={true}
          message={apiError}
          onClose={() => {
            setApiError(null);
          }}
          customKey={"gallery"}
        />
      )}
    </>
  );
};

export default Gallery;
