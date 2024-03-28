import { Button, Grid, TextField, Typography } from "@mui/material";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        Have questions, suggestions, or feedback? We'd love to hear from you!
        Please fill out the form below, and we'll get back to you as soon as
        possible.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Your Name"
              name="name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Your Email"
              name="email"
              type="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Message"
              name="message"
              multiline
              rows={6}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Typography variant="body1" paragraph marginTop={2}>
        Reach out to us
        at <a href="mailto:support@jsearch.com">support@jsearch.com</a>
      </Typography>
    </>
  );
};

export default Contact;
