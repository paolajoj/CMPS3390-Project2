import express from "express";
import cors from "cors";
import { db } from "./db.js";


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

app.get("/test-db", (req, res) => {

    db.query("SELECT NOW() AS currentTime", (err, result) => {
    if (err) {
      console.error("Database query failed:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "DB Connected", time: result[0].currentTime });
  });
});

app.listen(3001, () => 
    console.log("Server running on http://localhost:3001"));