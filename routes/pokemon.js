const pokemon = require('pokemontcgsdk'); // <--------https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript
const router = require('express').Router();
const cardData = require('../data');
// console.log(cardData);
router.get('/', async (req, res) => {
	try {
		// let base1Pokemon = await pokemon.card.where({
		// 	setCode: 'base1',
		// });
		// let base2Pokemon = await pokemon.card.where({
		// 	setCode: 'base2',
		// });
		// let allPokemon = base1Pokemon.concat(base2Pokemon);
		// // console.log(allPokemon);
		// if (!allPokemon) {
		// 	res.status(400).send('error getting pokemon');
		// }
		// res.status(200).json(allPokemon);

		// since the api has been funky lately we are gonna send some hardcoded data
		res.status(200).json(cardData);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
