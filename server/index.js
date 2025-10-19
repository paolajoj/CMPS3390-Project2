import express from "express";
import cors from "cors";
import { db } from "./db.js";
import dotenv from "dotenv";
import accountsRouter from "./routes/accounts.js";
import transactionsRouter from "./routes/transactions.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/accounts", accountsRouter);
app.use("/api/transactions", transactionsRouter);

app.get("/", (req, res) => res.send("API is running"));
app.listen(3001, () => console.log("Server running on http://localhost:3001"));