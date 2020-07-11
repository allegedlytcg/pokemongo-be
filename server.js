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
const socketTest = require('./routes/socketTest');

// console.log(cors);
// init middleware

const corsOptions = {
	origin: '*', // for sure change to deployed frontend link later
	methods: 'GET, POST, PUT, DELETE',
};

app.use(cors(corsOptions));

app.use(express.json({ extended: false }));

// connect database
dbConnect();

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/deck', deckRoutes);
app.use('/api/v1/pokemon', PokemonRoutes);
app.use('/api/v1/socketTest', socketTest);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
