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

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {account_id, type, amount, description } = req.body;

  console.log("Updating:", id, type, amount, description);


  db.query(
    "UPDATE transactions SET account_id = ?, type = ?, amount = ?, description = ? WHERE id = ?",
    [account_id, type, amount, description, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Transaction not found" });

      res.json({ id, account_id, type, amount, description });
    }
  );
});

export default router;