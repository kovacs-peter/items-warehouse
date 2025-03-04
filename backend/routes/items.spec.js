const request = require("supertest");
const express = require("express");
const itemsRouter = require("./items");

const app = express();
app.use(express.json());
app.use("/items", itemsRouter);

describe("Items API", () => {
  it("should create a new item", async () => {
    const newItem = {
      name: "New Item",
      description: "New item description",
      quantity: 10,
      unitPrice: 5,
    };

    const response = await request(app).post("/items").send(newItem);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newItem);
  });

  it("should get all items", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toBeGreaterThan(0);
  });

  it("should get an item by id", async () => {
    const response = await request(app).get("/items/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  it("should update an item by id", async () => {
    const updatedItem = {
      name: "Updated Item",
      description: "Updated item description",
      quantity: 20,
      unitPrice: 10,
    };

    const response = await request(app).put("/items/1").send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedItem);
  });

  it("should delete an item by id", async () => {
    const response = await request(app).delete("/items/1");
    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id", 1);
  });
});
