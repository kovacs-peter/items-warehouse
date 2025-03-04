const db = require("../database/db");

const createItemsTable = `
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    quantity INTEGER,
    unitPrice REAL
  )
`;

db.run(createItemsTable, (err) => {
  if (err) {
    console.error("Error creating items table:", err.message);
  } else {
    console.log("Items table created successfully.");
  }
});

db.close();
