import React, { useEffect, useState } from "react";


export interface Blog{
  images: string[];
  created_On: string;
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
  console.log("All",res)
  return res.json();
};

// Get Blog by ID (GET -> /blogs/{id})
export const getBlogById = async (id: string): Promise<Blog> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Blog not found");
  console.log("one",res)
  return res.json();
};
