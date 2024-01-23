import express from "express";
import dotenv from "dotenv";
import connectDb from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

connectDb();
const app = express();
app.use(express.json());
app.use(cors());

//Auth Routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Ecommerse" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
