const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const TABLES = require("../database/tables");
const dbPath = path.join(__dirname, "../database/test.sqlite");
const db = new sqlite3.Database(dbPath);

beforeAll((done) => {
  db.serialize(() => {
    Object.entries(TABLES).forEach(([_, migration]) => {
      db.run(migration, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
    done();
  });
});

afterAll((done) => {
  db.close(done);
});
