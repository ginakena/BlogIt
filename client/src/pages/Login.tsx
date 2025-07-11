import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Welcome back! Please login to your account.
        </Typography>

        <TextField
          label="Email or Username"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
        >
          Login
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
