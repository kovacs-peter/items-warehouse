const express = require("express");
const router = express.Router();
const db = require("../database/db");

router.get("/", (req, res) => {
  const getShipments = () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM shipments", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  const getShipmentItems = (shipmentId) => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM shipment_items WHERE shipment_id = ?", [shipmentId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  };

  const getAllShipmentsWithItems = async () => {
    const shipments = await getShipments();
    for (const shipment of shipments) {
      shipment.items = await getShipmentItems(shipment.id);
    }
    return shipments;
  };

  getAllShipmentsWithItems()
    .then((shipments) => {
      res.status(200).json(shipments);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

router.post("/", (req, res) => {
  const shipmentItems = req.body;

  const checkItemQuantity = (itemId, quantity) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT quantity FROM items WHERE id = ?", [itemId], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row || row.quantity < quantity) {
          reject(new Error(`Not enough quantity for item ID: ${itemId}`));
        } else {
          resolve();
        }
      });
    });
  };

  const updateItemQuantity = (itemId, quantity) => {
    return new Promise((resolve, reject) => {
      db.run("UPDATE items SET quantity = quantity - ? WHERE id = ?", [quantity, itemId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  const createShipment = () => {
    return new Promise((resolve, reject) => {
      db.run("INSERT INTO shipments (created_at) VALUES (CURRENT_TIMESTAMP)", function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  };

  const addShipmentItems = (shipmentId, items) => {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(
        "INSERT INTO shipment_items (shipment_id, item_id, quantity) VALUES (?, ?, ?)"
      );
      items.forEach((item) => {
        stmt.run(shipmentId, item.itemId, item.quantity);
      });
      stmt.finalize((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  const processShipment = async () => {
    for (const item of shipmentItems) {
      await checkItemQuantity(item.itemId, item.quantity);
    }

    const shipmentId = await createShipment();

    for (const item of shipmentItems) {
      await updateItemQuantity(item.itemId, item.quantity);
    }

    await addShipmentItems(shipmentId, shipmentItems);
  };

  processShipment()
    .then(() => {
      res.status(200).send("Shipment created successfully.");
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

module.exports = router;
