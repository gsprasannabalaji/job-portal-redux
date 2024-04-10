import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import jobPosts from "../mockData/jobPosts";
import Box from "@mui/material/Box";
import { Card, CardContent, Link, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { setJobError, setJobsList } from "../features/jobs/jobsSlice";


const JobListing = () => {
  const theme = useTheme();
  const jobPosts = useSelector((state) => state?.jobs?.jobsList);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_USER_API_HOSTNAME}get/jobs`,
          { withCredentials: true }
        );
        const jobs = result?.data;
        dispatch(setJobsList(jobs));
      } catch (error) {
        dispatch(
          setJobError({
            message: error?.response?.data?.message || "Network Error.",
            status: error?.response?.status || 500,
          })
        );
      }
    })();
  }, []);

  const getLastUpdatedDetails = (lastUpdated) => {
    const currentTime = new Date();
    const updatedTime = new Date(lastUpdated);
    const difference = (currentTime - updatedTime) / 1000; 

    if (difference < 60) {
        return `${Math.floor(difference)} second${Math.floor(difference) !== 1 ? 's' : ''} ago`;
    } else if (difference < 3600) { 
        const minutes = Math.floor(difference / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (difference < 86400) {
        const hours = Math.floor(difference / 3600);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else { 
        const days = Math.floor(difference / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }

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
          <Typography variant="h4" sx={{ mt: 0, mb: 2, color: theme?.palette?.primary?.main }}>
              {jobPost?.companyName}
            </Typography>
            <Typography variant="h5" sx={{ mt: 0, mb: 2 }}>
              {jobPost?.title}
            </Typography>
            <Box component="p" sx={{ mt: 0, mb: 2 }}>
              {jobPost?.description}
            </Box>
            <Box component="p" sx={{ mt: 0, mb: 2 }}>
              {`Salary : $${jobPost?.salary}`}
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
                sx={{ m: 0, color: theme?.palette?.secondary?.main }}
              >
                {getLastUpdatedDetails(jobPost?.lastUpdated)}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default JobListing;
