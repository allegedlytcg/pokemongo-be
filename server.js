const express = require('express');
require('dotenv').config();
const cors = require('cors');
// database connection file
const dbConnect = require('./dbConnect');
// route files
const userRoutes = require('./routes/user');
const deckRoutes = require('./routes/deck');
const PokemonRoutes = require('./routes/pokemon');
// initalize express
const app = express();

// console.log(cors);
// init middleware
app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*'); // for sure make this deployed frontend later
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept',
	);
	next();
});

app.use(express.json({ extended: false }));
// connect database
dbConnect();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/deck', deckRoutes);
app.use('/api/v1/pokemon', PokemonRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
