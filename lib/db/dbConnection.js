import mongoose from 'mongoose';

const connectToDatabase = async () =>{
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ecom16",
    });
    console.log("connected")
    
  } catch (err) {
    console.log(err)
  }
}

export default connectToDatabase()