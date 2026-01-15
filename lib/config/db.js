import mongoose from "mongoose";

 export const ConnectDB = async () => {
  
    await mongoose.connect("mongodb+srv://khushi3411:techkhushi@cluster0.vbdq5ks.mongodb.net/blog-app");
    console.log("DB Connected Successfully");
  } 


