import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import CustomSnackBar from "../components/CustomSnackBar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setGalleryImages, setGalleryError } from "../features/gallery/gallerySlice";


const Gallery = () => {
  const { galleryImages, error } = useSelector(
    (state) => state?.gallery
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUserDetails = localStorage.getItem("userDetails")
  ? JSON.parse(localStorage.getItem("userDetails"))
  : "";

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
        dispatch(setGalleryImages(images));
      } catch (error) {
        if (error?.response?.status == 401) {
          dispatch(setGalleryError({
            message: "You are not authorized to access this resource",
            status: 401,
          }));
          setTimeout(() => {
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("userDetails");
            navigate("/");
          }, 2000);
        } else if (error?.response?.status == 403) {
          dispatch(setGalleryError({
            message: error?.response?.data?.message || "Session Expired",
            status: 403,
          }));
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
          dispatch(setGalleryError({
            message: error?.response?.data?.message || "Session Expired",
            status: error?.response?.status || 500,
          }));
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
      {error?.message && (
        <CustomSnackBar
          isOpen={true}
          message={error?.message}
          onClose={() => {
            setGalleryError({
              message: "",
              status: 200
            })
          }}
          customKey={"gallery"}
        />
      )}
    </>
  );
};

export default Gallery;
