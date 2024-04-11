import { Button, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSnackBar from "../components/CustomSnackBar";
import { setApiError, setFormData } from "../features/login/loginSlice";
import loginImage from "../assets/login.webp";

const Login = () => {
  const { formData, apiError } = useSelector((state) => state?.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_HOSTNAME}user/login`,
        {
          email: formData?.email,
          password: formData?.password,
        },
        { withCredentials: true }
      );

      if (response && response?.data) {
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            email: formData?.email,
            fullName: response?.data?.fullName,
            role: response?.data?.role,
          })
        );
        if (response?.data?.role === "admin") {
          navigate("/employees");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "Server is down. Please try again later.";
      dispatch(setApiError(errorMessage));
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <img
            src={loginImage}
            alt="login"
            style={{ width: "100%", height: "100vh" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box component="h1" textAlign="center" sx={{ mt: 0 }}>
              Login
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "90%" },
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                onChange={handleChange}
                sx={{ width: 800 }}
              />
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                onChange={handleChange}
                sx={{ width: 300 }}
              />
              <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                Login
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {apiError && (
        <CustomSnackBar
          isOpen={true}
          message={apiError}
          onClose={() => {
            dispatch(setApiError(null));
          }}
          customKey={"login"}
        />
      )}
    </>
  );
};

export default Login;
