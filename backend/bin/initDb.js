const db = require("../database/db");
const TABLES = require("../database/tables");

Object.entries(TABLES).forEach(([definition, migration]) => {
  db.run(migration, (err) => {
    if (err) {
      console.error(`Error while running: ${definition}`, err.message);
    } else {
      console.log(`${definition} ran successfully.`);
    }
  });
});

db.close();
