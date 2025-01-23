const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');

const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

//connect to database
connectDB();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


//routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/items', itemRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});