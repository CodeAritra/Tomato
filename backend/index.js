import express from "express";
import connectDB from "./db.js";
import { configDotenv } from "dotenv";
import UserRoute from "./Routes/UserRoute.js"

configDotenv();
connectDB();

const app = express();
const PORT = parseInt(process.env.PORT);

app.use(express.json())

app.use('/auth/',UserRoute)

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
