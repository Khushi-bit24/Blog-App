import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { ConnectDB } from "@/lib/config/db";
import { writeFile } from "fs/promises";
const fs = require('fs')

// It is better to connect inside the handler to ensure it's ready
const connect = async () => {
    await ConnectDB();
};

export async function GET(request) {
    await connect();
    const blogId = request.nextUrl.searchParams.get("id");
    if(blogId){
        const blog= await BlogModel.findById(blogId);
        return NextResponse.json({blog})
    }
    else{
        const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });

    }
    
}

export async function POST(request) {
    try {
        await connect();
        const formData = await request.formData();
        const timestamp = Date.now();

        /* ---------- BLOG IMAGE (THUMBNAIL) ---------- */
        const image = formData.get("image");
        if (!image) {
            return NextResponse.json({ success: false, msg: "Thumbnail image is required" }, { status: 400 });
        }

        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const imagePath = `./public/${timestamp}_${image.name}`;
        await writeFile(imagePath, imageBuffer);
        const imageUrl = `/${timestamp}_${image.name}`;

        /* ---------- AUTHOR IMAGE ---------- */
        // We get this as a string from your frontend state: authorImg:"/profile_icon"
        const authorImgUrl = formData.get("authorImg");

        /* ---------- BLOG DATA ---------- */
        const blogData = {
            title: `${formData.get("title")}`,
            description: `${formData.get("description")}`,
            category: `${formData.get("category")}`,
            author: `${formData.get("author")}`,
            image: `${imageUrl}`,
            authorImg: `${authorImgUrl}`,
            date: new Date()
        };

        // This creates the entry in MongoDB
        await BlogModel.create(blogData);
        console.log("Blog Saved Successfully!");

        return NextResponse.json({
            success: true,
            msg: "Blog Added"
        });

    } catch (error) {
        console.error("POST ERROR DETAILS:", error);
        return NextResponse.json(
            { success: false, msg: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function DELETE(request){
    const id = await request.nextUrl.searchParams.get('id');
    const blog = await BlogModel.findById(id);
    fs.unlink('./public${blog.image}',()=>{});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({msg:"Blog Deleted"})

}