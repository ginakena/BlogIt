import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Alert
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useUserStore } from "../store/userStore";

const CreateBlog = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");

      const payload = {
        title,
        synopsis,
        content,
        featuredImg,
        authorId: id, // make sure your token or backend links this automatically
      };
      const res = await axiosInstance.post("/api/blogs", payload);
      return res.data;
    },
    onSuccess: () => {
      navigate("/blogs");
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Failed to create blog");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutate();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Create a New Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Share your story with the world.
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Synopsis"
            fullWidth
            margin="normal"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />
          <TextField
            label="Featured Image URL"
            fullWidth
            margin="normal"
            value={featuredImg}
            onChange={(e) => setFeaturedImg(e.target.value)}
            required
          />
          <TextField
            label="Content (Markdown supported)"
            fullWidth
            multiline
            rows={10}
            margin="normal"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            {isPending ? "Publishing..." : "Publish Blog"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CreateBlog;
