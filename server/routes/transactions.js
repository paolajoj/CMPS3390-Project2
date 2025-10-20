import express from "express";
import {db} from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.query("SELECT * FROM transactions", (err, results) => {
    if (err) return res.status(500).json({error: err});
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { account_id, type, amount, description } = req.body;
  db.query(
    "INSERT INTO transactions (account_id, type, amount, description) VALUES (?, ?, ?, ?)",
    [account_id, type, amount, description],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: results.insertId, account_id, type, amount, description });
    });
});



router.delete("/:id", (req, res) => {
  const {id} = req.params;
  db.query("DELETE FROM transactions WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({error: err});
    res.json({message: "Transaction has been deleted" });
  });
}
);

export default router;