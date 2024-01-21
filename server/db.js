import mongoose from "mongoose";
const URI = "";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(`Error Connecting to mongoDB ${err}`);
  }
};

export default connectDb;

//A5FrY7HHyh2IubLE;
