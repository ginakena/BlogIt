import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const GridItem = Grid as React.ElementType;

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["register-user"],
    mutationFn: async (newUser: User) => {
      const response = await axios.post("http://localhost:4000/api/auth/register", newUser);
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
    onSuccess: () => {
      navigate("/login");
    },
  });

  function handleSignUp() {
    setFormError("");
    if (password !== confirmPassword) {
      setFormError("Password and confirm password should match");
      return;
    }
    const newUser = { firstName, lastName, email, userName, password };
    mutate(newUser);
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontFamily: "Winky Rough", fontSize: "30px" }}>
          Sign Up
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Create a free BlogIt account
        </Typography>
        {formError && <Alert severity="error">{formError}</Alert>}
        <Grid container spacing={2}>
          <GridItem xs={6}>
            <TextField
              label="First Name"
              fullWidth
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </GridItem>
          <GridItem xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </GridItem>
        </Grid>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2, color: "#113F67", fontFamily: "Winky Rough" }}
          onClick={handleSignUp}
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </Button>

        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login" underline="hover">
            Sign In
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;
