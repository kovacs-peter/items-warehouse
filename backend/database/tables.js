const TABLES = {
  createItemsTable: `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    quantity INTEGER,
    unitPrice REAL
  )
`,
  createShipmentsTable: `
  CREATE TABLE IF NOT EXISTS shipments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`,
  createShipmentItemsTable: `
  CREATE TABLE IF NOT EXISTS shipment_items (
    shipment_id INTEGER,
    item_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (shipment_id) REFERENCES shipments(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
  );
`,
};

module.exports = TABLES;
