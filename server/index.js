import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => res.send("API is running"));
app.listen(3001, () => console.log("Server on http://localhost:3001"));