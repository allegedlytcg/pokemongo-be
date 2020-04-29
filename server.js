const express = require('express');
// database connection file
const dbConnect = require('./dbConnect');
require('dotenv').config();
// route files
const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck.js');

// initalize express
const app = express();

// init middleware
app.use(express.json({ extended: false }));

// connect database
dbConnect();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/deck', deckRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
