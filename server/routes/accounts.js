import express from "express";
import {db} from "../db.js";

const router = express.Router();


router.get("/", (req, res) => {
  db.query("SELECT * FROM accounts", (err, results) => {

    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
}
);

router.post("/", (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO accounts (name) VALUES (?)", [name], (err, results) => {

    if (err) return res.status(500).json({ error: err });
    res.json({ id: results.insertId, name });
  });
});



router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM accounts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Account deleted" });
});
}
);


export default router;