import React from "react";
import { Typography, Grid, ListItem, List, ListItemIcon, ListItemText } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

const About = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        About JSearch
      </Typography>
      <Typography variant="body1" paragraph>
        JSearch is a revolutionary job portal designed to simplify and
        streamline the job search process for both job seekers and employers.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph>
        Our mission at JSearch is to connect talented individuals with their
        dream jobs while helping employers find the perfect candidates quickly
        and efficiently.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Our Vision
      </Typography>
      <Typography variant="body1" paragraph>
        We envision a future where finding and filling job positions is
        effortless, transparent, and mutually beneficial for all parties
        involved.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Our Values
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Transparency: We believe in providing clear and honest information to both job seekers and employers." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Inclusivity: We strive to create an inclusive platform that welcomes individuals from all backgrounds and walks of life." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary="Efficiency: We are committed to developing efficient tools and features that make the job search and recruitment process as smooth as possible." />
        </ListItem>
      </List>
      <Typography variant="h5" gutterBottom>
        Meet the Team
      </Typography>
      <Typography variant="body1" paragraph>
        Meet the dedicated team behind JSearch, committed to revolutionizing the
        job search experience.
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Prasanna</Typography>
          <Typography variant="body2" color="grey">
            Co-founder & CEO
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Jane Smith</Typography>
          <Typography variant="body2" color="grey">
            Lead Developer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Alex Johnson</Typography>
          <Typography variant="body2" color="grey">
            Head of Marketing
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
