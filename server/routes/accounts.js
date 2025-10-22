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
  const {name} = req.body;

  db.query("INSERT INTO accounts (name) VALUES (?)", [name], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    const newAccount = {
        id: results.insertId,
        name,
        background_color: "white",
        font_family: "Arial",
      };

      res.json(newAccount);
    }
  );
});


router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { background_color, font_family } = req.body;

  db.query("UPDATE accounts SET background_color = COALESCE(?, background_color), font_family = COALESCE(?, font_family) WHERE id = ?",
    [background_color, font_family, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "Account settings updated successfully" });
    }
  );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM accounts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Account deleted :)" });
  });
});

//router.get("/:id", (req, res) => {
  //const { id } = req.params;
  //db.query("SELECT * FROM accounts WHERE id = ?", [id], (err, results) => {
    //if (err) return res.status(500).json({ error: err });
    //res.json(results[0]);
  //});
//});

//router.put("/:id", (req, res) => {
  //const { id } = req.params;
  //const { background_color, font_family } = req.body;

  //db.query(
    //"UPDATE accounts SET background_color = ?, font_family = ? WHERE id = ?",
    //[background_color, font_family, id],
    //(err, results) => {
      //if (err) return res.status(500).json({ error: err });
      //res.json({ message: "Account settings updated successfully" });
    //}
  //);
//});

export default router;
