import mongoose from "mongoose";

export async function connect(){
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("Succesfully Connected", () => {
      console.log("MongoDB connected Succesfully");
    })
    connection.on("Error Occured", (err) => {
      console.log("Error Occured while connecting with MongoDB" + err);
      
    })
  } catch (error) {
    console.log("DB not connected Succesfuly");
    console.error(error);
  }
}