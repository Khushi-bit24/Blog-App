import mongoose from "mongoose";

export const ConnectDB = async () => {

    if (mongoose.connection.readyState === 1) {
        return;
    }

    await mongoose.connect("mongodb+srv://techkhushi:dbkhushi123@cluster0.3g1iha3.mongodb.net/?appName=Cluster0");

    console.log("DB Connected Successfully");

}