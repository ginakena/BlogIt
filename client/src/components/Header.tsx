import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const Header = () => {
  const { user, logoutUser } = useUserStore();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary" fontWeight="bold" sx={{fontFamily: "Winky Rough", fontSize: "35px"}} >
          BlogIt
        </Typography>

        <Box>
          {user ? (
            <>
              <Button component={Link} to="/blogs" color="primary" sx={{ mr: 2, color: "#113F67", fontFamily: "Winky Rough", fontSize: "20px" }}>
                Posts
              </Button>
              <Button component={Link} to="/blogs/create" color="primary" sx={{ mr: 2, color: "#113F67", fontFamily: "Winky Rough", fontSize: "20px" }}>
                New Blog
              </Button>
              <Button component={Link} to="/profile" color="primary" sx={{ mr: 2, color: "#113F67", fontFamily: "Winky Rough", fontSize: "20px" }}>
                Profile
              </Button>
              <Typography variant="body1" sx={{ mr: 2 }} display="inline">
                Welcome back, {user.firstName}
              </Typography>
              <Button onClick={logoutUser} color="primary" variant="contained" sx={{ fontFamily: "Winky Rough", fontSize: "20px" }} >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" color="primary" sx={{ mr: 2 }}>
                Sign In
              </Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
