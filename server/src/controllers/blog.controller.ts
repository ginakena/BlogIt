import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/blogs
export const getAllBlogs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: { isDeleted: false },
      include: {
        author: {
          select: { firstName: true, lastName: true },
        },
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// POST /api/blogs
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  const { title, synopsis, content, featuredImg } = req.body;
  const user = (req as any).user; 

  if (!title || !synopsis || !content || !featuredImg) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const blog = await prisma.blogPost.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        authorId: user.id,
      },
    });
    res.status(201).json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
};

// GET /api/blogs/:blogId
export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;

  try {
    const blog = await prisma.blogPost.findFirst({
      where: { id: Number(blogId), isDeleted: false },
      include: {
        author: {
          select: { firstName: true, lastName: true },
        },
      },
    });

    if (!blog) {
      res.status(404).json({ message: "Blog not found" });
      return;
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
};

// PATCH /api/blogs/:blogId
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const { title, synopsis, content, featuredImg } = req.body;

  try {
    const updated = await prisma.blogPost.update({
      where: { id: Number(blogId) },
      data: { title, synopsis, content, featuredImg },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: "Failed to update blog" });
  }
};

// DELETE /api/blogs/:blogId
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;

  try {
    const blog = await prisma.blogPost.update({
      where: { id: Number(blogId) },
      data: { isDeleted: true },
    });

    res.status(200).json({ message: "Blog deleted successfully", blog });
  } catch (error) {
    console.error("Something went wrong:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
};
