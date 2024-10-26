const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('./config/db'); // Database connection
const blogRoutes = require('./routes/blogRoutes'); // Blog routes

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Use blog routes
app.use('/', blogRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
