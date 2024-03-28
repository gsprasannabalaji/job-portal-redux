import jobPosts from "../mockData/jobPosts";
import Box from "@mui/material/Box";
import { Card, CardContent, Link, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const JobListing = () => {
  const theme = useTheme();

  return (
    <>
      {jobPosts?.map((jobPost) => (
        <Card
          key={jobPost?.id}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent>
            <Typography variant="h5" sx={{ mt: 0, mb: 2 }}>
              {jobPost?.title}
            </Typography>
            <Box component="p" sx={{ mt: 0, mb: 2 }}>
              {jobPost?.description}
            </Box>
            <Box
              componen="div"
              sx={{
                display: { xs: "flex" },
                justifyContent: "space-between",
                alignItems: { xs: "baseline", md: "center" },
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Link
                component={"a"}
                underline="hover"
                href={jobPost?.applyLink}
                target="_blank"
                sx={{ mb: { xs: 1 } }}
              >
                Apply
              </Link>
              <Box
                component="p"
                sx={{ m: 0, color: theme.palette.secondary.main }}
              >
                {jobPost?.lastUpdated}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default JobListing;
