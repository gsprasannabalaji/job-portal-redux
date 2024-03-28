import { useState } from "react";
import { TextField, Grid, IconButton, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";
import amazonLogo from "../assets/amazon.png";
import googleLogo from "../assets/Google.png";
import deloitteLogo from "../assets/deloitte.png";
import modernaLogo from "../assets/moderna.png";
import salesforceLogo from "../assets/Salesforce-logo.jpg";
import walmartLogo from "../assets/Walmart_logo.webp";
import metaLogo from "../assets/meta.png";
import pwcLogo from "../assets/pwc.webp";

const StyledIconButton = styled(IconButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.common.white};
  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.dark};
  }
`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [companyImages] = useState([
    {
      url: amazonLogo,
      altText: "Amazon",
    },
    {
      url: googleLogo,
      altText: "Google",
    },
    {
      url: metaLogo,
      altText: "Meta",
    },
    {
      url: deloitteLogo,
      altText: "Deloitte",
    },
    {
      url: modernaLogo,
      altText: "Moderna",
    },
    {
      url: salesforceLogo,
      altText: "Salesforce",
    },
    {
      url: walmartLogo,
      altText: "Walmart",
    },
    {
      url: amazonLogo,
      altText: "Amazon",
    },
    {
      url: pwcLogo,
      altText: "PWC",
    },
  ]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    // Here you can implement the logic to perform the search based on the searchQuery
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <Typography variant="h4" textAlign={"center"} mb={2}>
        Search for a Job
      </Typography>
      <Typography variant="body1" textAlign="center" mb={3}>
        JSearch works with thousands of the best companies worldwide.
      </Typography>
      <Grid
        container
        columnGap={1}
        alignItems="center"
        justifyContent={"space-around"}
        marginBottom={3}
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            label="Search for jobs"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={1}>
          <StyledIconButton onClick={handleSearchSubmit} aria-label="search">
            <SearchIcon />
          </StyledIconButton>
        </Grid>
      </Grid>

      <Typography variant={"h6"} textAlign={"center"} color="grey" mb={2}>
        OVER 100 MILLION JOBS
      </Typography>
      <Typography variant="h4" textAlign={"center"} mb={3}>
        Top Hiring Companies
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {companyImages?.map((image, index) => {
          return (
            <Grid
              item
              xs={1}
              sm={4}
              md={3}
              key={index}
              display={"flex"}
              alignItems={"center"}
              style={{ height: "200px" }}
            >
              <img
                src={`${image.url}`}
                alt={image.altText}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  height: "auto",
                  width: "auto",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
