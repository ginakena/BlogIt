import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useUserStore } from "../store/userStore";
import axios from "axios";

const CreateBlog = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Cloudinary Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogitpreset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxqbmfmhs/image/upload",
        formData
      );
      setFeaturedImg(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-blog"],
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");

      const payload = {
        title,
        synopsis,
        content,
        featuredImg,
        // authorId: user?.id,
      };

      const res = await axiosInstance.post("/api/blogs", payload);
      return res.data;
    },
    onSuccess: () => {
      navigate("/blogs");
    },
    onError: (err: any) => {
      setError(err?.response?.data?.message || "Failed to create blog");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("title", title);
    console.log("synopsis", synopsis);
    console.log("featuredImg", featuredImg);
    console.log("content", content);
  


    if (!title || !synopsis || !featuredImg || !content) {
      setError("All fields are required");
      return;
    }

    mutate();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{fontFamily: "Winky Rough", fontSize: "30px"}} >
          Create a New Blog
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Share your story with the world.
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"            
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Synopsis"             
            margin="normal"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            required
          />
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2, mb: 2 }}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>

          {featuredImg && (
            <Box mt={1}>
              <img
                src={featuredImg}
                alt="Preview"
                width="50%"
                style={{ borderRadius: 8 }}
              />
            </Box>
          )}

          <TextField
            label="Content "
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
            disabled={isPending || uploading}
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
