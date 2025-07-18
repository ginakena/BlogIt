import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(to bottom right, #003092, #3D74B6, #3D74B6)",
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" p={3} bgcolor="#fff">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            width={32}
            height={32}
            bgcolor="#2563eb"
            borderRadius={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body1" color="#fff" fontWeight="bold">
              B
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold" color="#2563eb">
            BlogIt
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="text" sx={{ color: "#4b5563" }} component={RouterLink} to="/login">
            Sign In
          </Button>
          <Button variant="contained" color="primary" component={RouterLink} to="/register">
            Get Started
          </Button>
        </Stack>
      </Box>

      {/* Hero Section */}
      <Container sx={{ py: 10, display: "flex", justifyContent: "space-between", gap: 4, flexWrap: "wrap" }}>
        <Box flex={1} maxWidth="600px">
          <Box
            mb={3}
            px={2}
            py={1}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 1,
              display: "inline-block",
            }}
          >
            <Typography color="#fff">Personalized Blogging Platform</Typography>
          </Box>

          <Typography variant="h2" color="#fff" fontWeight="bold" gutterBottom>
            Blogging Made{" "}
            <Box component="span" color="yellow.main">
              Easier With
            </Box>
            <br />
            Blogit
          </Typography>

          <Typography variant="h6" color="rgba(255,255,255,0.9)" mb={4}>
            Write, publish, and connect with readers who love your
            <br />
            content.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              size="large"
              sx={{
                backgroundColor: "#fff",
                color: "#003092",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "#f3f4f6",
                },
              }}
              component={RouterLink}
              to="/register"
            >
              Get Started →
            </Button>
            <Button
              size="large"
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                px: 4,
                py: 1.5,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              component={RouterLink}
              to="/blogs"
            >
              Explore Blogs
            </Button>
          </Stack>

          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold" color="#fff">
              The Future of Blogging
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)" mt={0.5}>
              Experience the next generation of content creation...
            </Typography>
          </Box>
        </Box>

        {/* Right Side Image */}
        <Box flex={1} display="flex" justifyContent="center" alignItems="center">
          <img
            src="/blog-684748_1280.jpg"
            alt="Hero blogging illustration"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
