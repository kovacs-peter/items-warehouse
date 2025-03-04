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
    expect(response.body.name).toBe(newItem.name);
  });

  it("should get all items", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should get an item by ID", async () => {
    const newItem = { name: "Item 2", description: "Description 2", quantity: 5, unitPrice: 50.0 };
    const createResponse = await request(app).post("/items").send(newItem);
    const itemId = createResponse.body.id;
    const response = await request(app).get(`/items/${itemId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newItem.name);
  });

  it("should update an item", async () => {
    const newItem = {
      name: "Item 3",
      description: "Description 3",
      quantity: 15,
      unitPrice: 150.0,
    };
    const createResponse = await request(app).post("/items").send(newItem);
    const itemId = createResponse.body.id;
    const updatedItem = {
      name: "Updated Item 3",
      description: "Updated Description 3",
      quantity: 20,
      unitPrice: 200.0,
    };
    const response = await request(app).put(`/items/${itemId}`).send(updatedItem);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedItem.name);
  });

  it("should delete an item", async () => {
    const newItem = { name: "Item 4", description: "Description 4", quantity: 8, unitPrice: 80.0 };
    const createResponse = await request(app).post("/items").send(newItem);
    const itemId = createResponse.body.id;
    const response = await request(app).delete(`/items/${itemId}`);
    expect(response.status).toBe(200);
  });
});
