import React, { useEffect, useState } from "react";


export interface Blog{
  id: string;
  title: string;
  thumbnailImage: string;
  author:string;
  category: string;
  tags: string[];
  status:string;
  readTime: number;
  viewsCount:number;
  metaTitle: string;
  metaDescription: string;
  content: string;
  updated_On: string;
  
}


export const blogs: Blog[] = [];

const BASE_URL = "https://node249428-env-8797427.in1.apiqcloud.com/blogs"; 

// Get All Blogs (GET -> /blogs/all)
export const getAllBlogs = async (): Promise<Blog[]> => {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
};

// Get Blog by ID (GET -> /blogs/{id})
export const getBlogById = async (id: string): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Blog not found");
  return res.json();
};

// Create Blog (POST -> /blogs/add)
export const createBlog = async (blog: Blog): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create blog");
  }
  return res.json();
};

// Update Blog (PUT -> /blogs/{id})
export const updateBlog = async (id: string, blog: Blog): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(blog),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to update blog");
  }
  return res.json();
};

// Delete Blog (DELETE -> /blogs/{id})
export const deleteBlog = async (id: string): Promise<void> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to delete blog");
  }
};