import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();


router.get("/", getAllBlogs);


router.post("/", authenticateToken, createBlog);


router.get("/:blogId", getBlogById);

router.patch("/:blogId", updateBlog);


router.delete("/:blogId", deleteBlog);

export default router;
