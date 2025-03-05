const request = require("supertest");
const express = require("express");
const shipmentsRouter = require("../routes/shipments");
const app = express();
const db = require("../database/db");

app.use(express.json());
app.use("/shipments", shipmentsRouter);

describe("Shipments API", () => {
  beforeAll((done) => {
    db.serialize(() => {
      db.run("DELETE FROM shipment_items");
      db.run("DELETE FROM shipments");
      db.run("DELETE FROM items");
      db.run(
        "INSERT INTO items (id, name, description, quantity, unitPrice) VALUES ('1' ,'Item 1', 'Description 1', 100, 10.0)"
      );
      done();
    });
  });

  afterAll((done) => {
    db.close(done);
  });

  it("should create a new shipment", async () => {
    const shipmentItems = [{ itemId: 1, quantity: 10 }];
    const response = await request(app).post("/shipments").send(shipmentItems);
    expect(response.status).toBe(200);
    expect(response.text).toBe("Shipment created successfully.");
  });

  it("should get all shipments", async () => {
    const response = await request(app).get("/shipments");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("should return an error if item quantity is insufficient", async () => {
    const shipmentItems = [{ itemId: 1, quantity: 1000 }];
    const response = await request(app).post("/shipments").send(shipmentItems);
    expect(response.status).toBe(400);
    expect(response.text).toBe("Not enough quantity for item ID: 1");
  });
});
