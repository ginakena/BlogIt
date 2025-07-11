import { Container, Typography,  Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Blogging made easier with BlogIt 😚
      </Typography>
      <Typography variant="h6" color="text.secondary" mb={4}>
        Create a free account to start blogging
      </Typography>
      <Button component={Link} to="/register" variant="contained" size="large">
        Get Started
      </Button>
    </Container>
  );
};

export default Home;
