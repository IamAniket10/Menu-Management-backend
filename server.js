const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errorHandler, AppError } = require('./middleware/errorHandler');

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

// app.use((req, res, next) => {
//     console.log(`Incoming ${req.method} request to ${req.path}`);
//     console.log('Request Body:', req.body);
//     next();
// });


//routes
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/items', itemRoutes);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
  
// Global error handling middleware
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;