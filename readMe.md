#  Walmart Inventory Management System

A full-stack Inventory Management System built for Walmart to manage item registration, stock updates, item retrieval, and deletion. This system is designed using the MERN stack and aims to replace manual inventory processes with a fast, user-friendly, and scalable digital solution.

---

## Features

- **Add New Inventory Items** with name, category, quantity, price, supplier, and SKU
- **View All Inventory Items** in a tabular format
- **Edit Inventory Item** details using item ID
- **Delete Inventory Items**
- **Search by Item Name or SKU**
- **Client-side & Backend Validation**
- **Comprehensive Testing** with 10 unit/integration tests

---

## Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript (Fetch API)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (using Mongoose ODM)

### Testing
- Jest (Unit & Integration Testing)
- Supertest (HTTP endpoint testing)

## Test Cases
- Add item successfully
- Add item with missing fields
- Add item with duplicate SKU
- Fetch all items
- Get item by valid ID
- Get item by invalid ID
- Update item details
- Update with invalid ID
- Delete item by ID
- Delete item not found



## System Architecture

- **Frontend:** Form-based UI built with HTML/CSS/JS
- **Backend:** RESTful API using Express.js
- **Database:** MongoDB with Mongoose for schema validation

## Commands

- npm init -y
- npm install express mongoose cors body-parser dotenv
- npm install nodemon --save-dev
