import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axios";
import { useUserStore } from "../store/userStore";

const GridItem = Grid as React.ElementType;

interface Blog {
  id: number;
  title: string;
  synopsis: string;
  updatedAt: string;
}

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
  });

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["my-blogs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/user/blogs");
      return res.data.blogs;
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: async () => {
      const res = await axiosInstance.patch("/api/user", form);
      return res.data;
    },
    onSuccess: () => {
      alert("Profile updated!");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>

      <Box sx={{ p: 3, boxShadow: 2, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" mb={2}>
          Personal Info
        </Typography>
        <Grid container spacing={2}>
          <GridItem  xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              value={form.firstName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem  xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              value={form.lastName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem  xs={6}>
            <TextField
              label="Username"
              name="userName"
              fullWidth
              value={form.userName}
              onChange={handleChange}
            />
          </GridItem>
          <GridItem  xs={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
            />
          </GridItem>
        </Grid>
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => updateProfile()}
          disabled={isPending}
        >
          Update Profile
        </Button>
      </Box>

      <Typography variant="h5" mb={2}>
        My Blogs
      </Typography>

      {isLoading ? (
        <Typography>Loading blogs...</Typography>
      ) : (
        <Stack spacing={2}>
          {blogs?.length === 0 && <Typography>No blogs yet.</Typography>}
          {blogs?.map((blog: Blog) => (
            <Card key={blog.id} variant="outlined">
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  {blog.synopsis}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="error">
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Profile;
