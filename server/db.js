import mongoose from "mongoose";
const URI =
  "mongodb+srv://surendraydv022:A5FrY7HHyh2IubLE@cluster0.pec4cvl.mongodb.net/Ecom";
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
