const pokemon = require('pokemontcgsdk'); // <--------https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript
const router = require('express').Router();

router.get('/', async (req, res) => {
	try {
		let base1Pokemon = await pokemon.card.where({
			setCode: 'base1',
		});

		let base2Pokemon = await pokemon.card.where({
			setCode: 'base2',
		});

		let allPokemon = [base1Pokemon, base2Pokemon];

		if (!allPokemon) {
			res.status(400).send('error getting pokemon');
		}

		res.status(200).json(allPokemon);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('server error');
	}
});

module.exports = router;
