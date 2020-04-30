const express = require('express');
require('dotenv').config();
// database connection file
const dbConnect = require('./dbConnect');
// route files
const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck');
const PokemonRoutes = require('./routes/pokemon');
// initalize express
const app = express();

// init middleware
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // change this to deployed url later
	next();
});
// connect database
dbConnect();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/deck', deckRoutes);
app.use('/api/v1/pokemon', PokemonRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
