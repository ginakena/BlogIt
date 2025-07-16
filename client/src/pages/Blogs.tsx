import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Skeleton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";

const GridItem = Grid as React.ElementType;

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
  };
}

const Blogs = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/blogs");
       return res.data as Blog[];
    },
  });

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Latest Blogs
      </Typography>

      {isPending ? (
        <Grid container spacing={3}>
          {Array.from({ length: 3 }).map((_, i) => (
            <GridItem  xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={180} sx={{ mb: 1 }} />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton width="40%" />
            </GridItem>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error">Failed to load blogs.</Typography>
      ) : (
        <Grid container spacing={4}>
          {data?.map((blog) => (
            <GridItem  xs={12} sm={6} md={4} key={blog.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={blog.featuredImg}
                  alt={blog.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {blog.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {blog.synopsis}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="text.secondary">
                      By {blog.author.firstName[0]}.{blog.author.lastName[0]}.
                    </Typography>
                  </Box>
                </CardContent>
                <Box textAlign="center" pb={2}>
                  <Button
                    component={Link}
                    to={`/blogs/${blog.id}`}
                    variant="outlined"
                    color="primary"
                  >
                    Read More
                  </Button>
                </Box>
              </Card>
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Blogs;
