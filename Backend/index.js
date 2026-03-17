import express from "express";
import connectDB from "./config/Db_connect.js";
import planet_routes from "./routes/planet_routes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", planet_routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

