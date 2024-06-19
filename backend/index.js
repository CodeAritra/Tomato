import express from "express";
import connectDB from "./db.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import UserRoute from "./Routes/UserRoute.js"
import productRoute from "./Routes/productRoute.js"

configDotenv();
connectDB();

const app = express();
const PORT = parseInt(process.env.PORT);

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/auth/',UserRoute)
app.use('/product/',productRoute)

app.get("/", (req, res) => {
  res.send("HIIIII");
});

try {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.log("error = " + error);
}
