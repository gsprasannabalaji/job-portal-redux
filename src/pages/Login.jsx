import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomSnackBar from "../components/CustomSnackBar";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          JSON.stringify({ email: formData?.email, fullName: response?.data?.fullName })
        );
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Server is down. Please try again later.";
      setApiError(errorMessage);
    }
  };

  return (
    <>
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
            "& .MuiTextField-root": { m: 1, width: "50ch" },
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
      {apiError && <CustomSnackBar isOpen={true} message={apiError} onClose={() => {setApiError(null)}} customKey={"login"} />}
    </>
  );
};

export default Login;
