import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          BlogIt
        </Typography>
        <Box>
          <Button component={Link} to="/login" color="primary" sx={{ mr: 2 }}>
            Sign In
          </Button>
          <Button component={Link} to="/register" variant="contained" color="primary">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
