import mysql from "mysql2";
//import { configDotenv } from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) =>
    {
  if (err) {
    console.error("MySQL connection failed... ", err);
    return;
}
  console.log("Connected to MySQL Database!");
});