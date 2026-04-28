import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { ConnectDB } from "@/lib/config/db";
import mongoose from "mongoose";
import { writeFile } from "fs/promises";
const fs = require("fs");

// Connect DB
const connect = async () => {
  await ConnectDB();
};



// ===================== GET =====================
export async function GET(request) {
  await connect();

  const blogId = request.nextUrl.searchParams.get("id");

  // 👉 GET SINGLE BLOG
  if (blogId) {
    // ✅ Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({
        success: false,
        msg: "Invalid Blog ID",
      });
    }

    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return NextResponse.json({
        success: false,
        msg: "Blog not found",
      });
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  }

  // 👉 GET ALL BLOGS
  const blogs = await BlogModel.find({});
  return NextResponse.json({
    success: true,
    blogs,
  });
}



// ===================== POST =====================
export async function POST(request) {
  try {
    await connect();

    const formData = await request.formData();
    const timestamp = Date.now();

    // ---------- IMAGE ----------
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { success: false, msg: "Image is required" },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const imagePath = `./public/${timestamp}_${image.name}`;

    await writeFile(imagePath, imageBuffer);

    const imageUrl = `/${timestamp}_${image.name}`;

    // ---------- BLOG DATA ----------
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imageUrl,
      authorImg: formData.get("authorImg"),
      date: new Date(),
    };

    await BlogModel.create(blogData);

    return NextResponse.json({
      success: true,
      msg: "Blog Added",
    });

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { success: false, msg: "Internal Server Error" },
      { status: 500 }
    );
  }
}



// ===================== DELETE =====================
export async function DELETE(request) {
  await connect();

  const id = request.nextUrl.searchParams.get("id");

  // ✅ Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({
      success: false,
      msg: "Invalid ID",
    });
  }

  const blog = await BlogModel.findById(id);

  if (!blog) {
    return NextResponse.json({
      success: false,
      msg: "Blog not found",
    });
  }

  // Delete image
  try {
    fs.unlink(`./public${blog.image}`, () => {});
  } catch (err) {
    console.log("Image delete error:", err);
  }

  // Delete blog
  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
    msg: "Blog Deleted",
  });
}