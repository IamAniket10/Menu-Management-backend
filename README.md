# Menu Management:
This is the backend server for a menu management application built using Node.js and Express.js. The application allows users to manage categories, subcategories, and items within a menu.

- Live : https://menu-management-backend-pj2c.onrender.com

## Tech Stack
- Nodejs
- Express
- MongoDB
- Postman

## Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/menu-management-backend.git
```

2. Navigate to the project directory:
```bash
cd menu-management-backend
```

3. Install the dependencies:
```bash
npm install
```

4. Set up the environment variables:
   - Create a .env file in the root directory.
   - Add the following environment variables:
```bash
MONGODB_URI=<your-mongodb-connection-string>
PORT=<your-desired-port-number>
NODE_ENV=<development or production>
```

5. Start the Server
```bash
npm start
```

The server will start running on the specified port.

## Usage
You can use tools like Postman or cURL to interact with the API endpoints. I have used Postman. The documentation below provides detailed information about the available endpoints.

## API Endpoints

### Categories
1. Create a Category
   - Endpoint: POST/api/categories
   - Request Body:
  ``` bash
{
  "name": "Beverages",
  "image": "https://example.com/beverages.jpg",
  "description": "All kinds of beverages",
  "taxApplicable": true,
  "tax": 10,
  "taxType": "percentage"
}
```

2. Get All Categories
   - Endpoint: GET /api/categories

3. Get a Category by ID
   - Endpoint: GET /api/categories/:id

4. Get a Category by Name
   - Endpoint: GET /api/categories/name/:name


5. Update a Category
   - Endpoint: PUT /api/categories/:id
   - Request Body: Same as the create category request

6. Delete a Category
   - Endpoint: DELETE /api/categories/:id

### Subcategories
1. Create a Subcategory
   - Endpoint: POST /api/subcategories
   - Request Body:
```bash
{
  "name": "Hot Beverages",
  "image": "https://example.com/hot-beverages.jpg",
  "description": "Hot drinks like coffee and tea",
  "category": "6078c0a1b4b5c1234567890"
}
```

2. Get All Subcategories
   - Endpoint: GET /api/subcategories

3. Get Subcategories by Category
   - Endpoint: GET /api/subcategories/category/:categoryId

4. Get a Subcategory by ID
   - Endpoint: GET /api/subcategories/:id

5. Get a Subcategory by Name
   - Endpoint: GET /api/subcategories/name/:name

6. Update a Subcategory
   - Endpoint: PUT /api/subcategories/:id
   - Request Body: Same as the create subcategory request

7. Delete a Subcategory
   -Endpoint: DELETE /api/subcategories/:id


### Items

1. Create an Item
   - Endpoint: POST /api/items
   - Request Body:
```bash
{
  "name": "Iced Coffee",
  "image": "https://example.com/iced-coffee.jpg",
  "description": "Chilled and refreshing coffee",
  "category": "6078c0a1b4b5c1234567890",
  "subCategory": "6078c0a1b4b5c1234567891",
  "taxApplicable": true,
  "tax": 5,
  "baseAmount": 3.99,
  "discount": 0.5,
  "totalAmount": 3.49
}
```


2. Get All Items
   - Endpoint: GET /api/items


3. Get Items by Category
   - Endpoint: GET /api/items/category/:categoryId


4. Get Items by Subcategory
   - Endpoint: GET /api/items/subcategory/:subCategoryId


5. Get an Item by ID
   - Endpoint: GET /api/items/:id


6. Search Items by Name
   - Endpoint: GET /api/items/search/:name


7. Update an Item
   - Endpoint: PUT /api/items/:id
   - Request Body: Same as the create item request


8. Delete an Item
   - Endpoint: DELETE /api/items/:id
