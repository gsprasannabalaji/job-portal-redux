import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [apiError, setApiError] = useState(null);
  const currentUserDetails = localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : "";

  useEffect(() => {
    (async () => {
      try{
        const result = await axios.get(
          `${import.meta.env.VITE_USER_API_HOSTNAME}user/getImage/${
            currentUserDetails?.email
          }`
        );
        const images = result?.data;
        setGalleryImages(images);
      } catch(error) {
        setApiError("Network Request Failed");
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
      {apiError && <CustomSnackBar isOpen={true} message={apiError} onClose={() => {setApiError(null)}} customKey={"login"} />}
    </>
  );
};

export default Gallery;
