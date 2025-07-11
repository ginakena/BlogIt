import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";

const router = Router();


router.get("/", getAllBlogs);


router.post("/", createBlog);


router.get("/:blogId", getBlogById);

router.patch("/:blogId", updateBlog);


router.delete("/:blogId", deleteBlog);

export default router;
