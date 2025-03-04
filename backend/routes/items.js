const express = require("express");
const db = require("../database/db.js");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, description, quantity, unitPrice } = req.body;
  const sql = "INSERT INTO items (name, description, quantity, unitPrice) VALUES (?, ?, ?, ?)";
  const params = [name, description, quantity, unitPrice];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

router.get("/", (req, res) => {
  const sql = "SELECT * FROM items";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM items WHERE id = ?";
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

router.put("/:id", (req, res) => {
  const { name, description, quantity, unitPrice } = req.body;
  const sql =
    "UPDATE items SET name = ?, description = ?, quantity = ?, unitPrice = ? WHERE id = ?";
  const params = [name, description, quantity, unitPrice, req.params.id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ id: req.params.id, ...req.body });
  });
});

router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM items WHERE id = ?";
  const params = [req.params.id];
  db.run(sql, params, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deletedID: req.params.id });
  });
});

module.exports = router;
