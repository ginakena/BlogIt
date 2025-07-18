import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useUserStore } from "../store/userStore";
import { setToken } from "../utils/token";

interface LoginDetails {
  emailOrUsername: string;
  password: string;
}

const Login = () => {
  const { setUser } = useUserStore();
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (loginDetails: LoginDetails) => {
      const response = await axiosInstance.post("/api/auth/login", loginDetails);
      return response.data;
    },
    onError: (error: unknown) => {
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.data?.message === "string"
      ) {
        setFormError((error as any).response.data.message);
      } else {
        setFormError("Something went wrong. Try again later.");
      }
    },
    onSuccess: (data: any) => {
      setToken(data.token);
      setUser(data.user);
      navigate("/blogs");
    },
  });

  function handleLogin() {
    const payload: any = { password };
    if (emailOrUsername.includes("@")) {
      payload.email = emailOrUsername;
    } else {
      payload.userName = emailOrUsername;
    }

    mutate(payload);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: "Winky Rough", fontSize: "30px" }}>
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Welcome back! Please login to your account.
        </Typography>
        {formError && <Alert severity="error">{formError}</Alert>}
        <TextField
          label="Email or Username"
          fullWidth
          margin="normal"
          required
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2, color: "#113F67", fontFamily: "Winky Rough" }}
          onClick={handleLogin}
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>

        <Typography variant="body2" textAlign="center" mt={2}>
          Don't have an account?{" "}
          <MuiLink component={Link} to="/register" underline="hover">
            Sign Up
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
