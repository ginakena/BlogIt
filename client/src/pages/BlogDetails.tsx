import {
  Box,
  Container,
  Typography,
  Avatar,
  CircularProgress,
  Alert,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import ReactMarkdown from "react-markdown";

const BlogDetails = () => {
  const { blogId } = useParams();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/api/blogs/${blogId}`);
      return response.data;
    },
    enabled: !!blogId,
  });

  if (isLoading) return <CircularProgress sx={{ mt: 10, display: 'block', mx: 'auto' }} />;
  if (isError)
    return <Alert severity="error" sx={{ mt: 4 }}>Something went wrong: {error.message}</Alert>;

  const { title, content, featuredImg, synopsis, author, createdAt } = data;

  return (
    <Container maxWidth="md">
      <Paper sx={{ mt: 6, p: 4, borderRadius: 2, boxShadow: 3 }}>
        <img
          src={featuredImg}
          alt={title}
          style={{ width: "100%", borderRadius: 12, marginBottom: 20 }}
        />

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {synopsis}
        </Typography>

        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar>
            {author.firstName[0]}
            {author.lastName[0]}
          </Avatar>
          <Box>
            <Typography fontWeight="medium">
              {author.firstName} {author.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Posted on {new Date(createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Box mt={4}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetails;
