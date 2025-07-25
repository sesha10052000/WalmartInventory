const request = require('supertest');
const mongoose = require('mongoose');
const { app, Item } = require('../server');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/walmartdb-test');
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // clean up test DB
  await mongoose.connection.close();
});

describe('Walmart Inventory System - CRUD API Tests', () => {
  let createdId;

  test('POST /items - should create an item', async () => {
    const res = await request(app).post('/items').send({
      productName: 'Apples',
      price: 3,
      quantity: 50,
      sellerName: 'FruitFarm',
      sellerPhone: '1234567890',
      sellerEmail: 'fruit@example.com'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Item added to inventory.');
  });

  // 2. Create item - missing fields
  test("POST /items - should fail with missing fields", async () => {
    const res = await request(app).post('/items').send({
      productName: "Orange"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Please fill all fields.");
  });

  // 3. Read all items
  test("GET /items - should return array of items", async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    createdItemId = res.body[0]._id;
  });

  // 4. Update item - success
  test("PUT /items/:id - should update item details", async () => {
    const res = await request(app).put(`/items/${createdItemId}`).send({
      price: 2.0,
      quantity: 45,
      sellerPhone: "9999999999"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item updated successfully");
    expect(res.body.item.price).toBe(2.0);
  });

  // 5. Update item - missing fields
  test("PUT /items/:id - should fail with missing update fields", async () => {
    const res = await request(app).put(`/items/${createdItemId}`).send({
      price: 3.0
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing fields");
  });

  // 6. Delete item - success
  test("DELETE /items/:id - should delete item", async () => {
    const res = await request(app).delete(`/items/${createdItemId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Item deleted successfully");
  });

  // 7. Delete item - not found
  test("DELETE /items/:id - should return not found", async () => {
    const res = await request(app).delete(`/items/${createdItemId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Item not found");
  });

  // 8. Update item - invalid ID
  test("PUT /items/:id - should fail with invalid ID", async () => {
    const res = await request(app).put(`/items/invalidid123`).send({
      price: 4.5,
      quantity: 10,
      sellerPhone: "1111111111"
    });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Error updating item");
  });

  // 9. Create multiple items
  test("POST /items - create multiple items", async () => {
    const items = [
      {
        productName: "Milk",
        price: 0.9,
        quantity: 20,
        sellerName: "DairyCo",
        sellerPhone: "1234567890",
        sellerEmail: "milk@dairy.com"
      },
      {
        productName: "Bread",
        price: 1.1,
        quantity: 30,
        sellerName: "Bakers",
        sellerPhone: "4567891230",
        sellerEmail: "bread@bakers.com"
      }
    ];

    for (const item of items) {
      const res = await request(app).post('/items').send(item);
      expect(res.statusCode).toBe(201);
    }
  });

  // 10. Read and validate count
  test("GET /items - verify item count", async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2); // Milk & Bread
  });

});
