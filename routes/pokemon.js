const pokemon = require('pokemontcgsdk'); // <--------https://github.com/PokemonTCG/pokemon-tcg-sdk-javascript
const router = require('express').Router();
const cardData = require('../data');
// console.log(cardData);

// @route     GET api/v1/pokemon
// @desc      Get all cards
// @access    public
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

// @route     GET api/v1/pokemon/grass
// @desc      Get all grass pokemon cards
// @access    public
router.get('/grass', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}

	let grass = pokemon.filter((grass) => grass.types[0] === 'Grass');

	res.status(200).json(grass);
});

// @route     GET api/v1/pokemon/fire
// @desc      Get all fire pokemon cards
// @access    public
router.get('/fire', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}

	let fire = pokemon.filter((fire) => fire.types[0] === 'Fire');

	res.status(200).json(fire);
});

// @route     GET api/v1/pokemon/psychic
// @desc      Get all psychic pokemon cards
// @access    public
router.get('/psychic', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}

	let psychic = pokemon.filter((psychic) => psychic.types[0] === 'Psychic');

	res.status(200).json(psychic);
});

// @route     GET api/v1/pokemon/water
// @desc      Get all water pokemon cards
// @access    public
router.get('/water', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}
	let water = pokemon.filter((water) => water.types[0] === 'Water');

	res.status(200).json(water);
});

// @route     GET api/v1/pokemon/colorless
// @desc      Get all colorless pokemon cards
// @access    public
router.get('/colorless', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}
	let colorless = pokemon.filter(
		(colorless) => colorless.types[0] === 'Colorless',
	);

	res.status(200).json(colorless);
});

// @route     GET api/v1/pokemon/fighting
// @desc      Get all fighting pokemon cards
// @access    public
router.get('/fighting', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}
	let fighting = pokemon.filter(
		(fighting) => fighting.types[0] === 'Fighting',
	);

	res.status(200).json(fighting);
});

// @route     GET api/v1/pokemon/lightning
// @desc      Get all fighting pokemon cards
// @access    public
router.get('/lightning', (req, res) => {
	let pokemon = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].types) pokemon.push(cardData[i]);
	}
	let lightning = pokemon.filter(
		(lightning) => lightning.types[0] === 'Lightning',
	);

	res.status(200).json(lightning);
});

// @route     GET api/v1/pokemon/trainer
// @desc      Get all trainer cards
// @access    public
router.get('/trainer', (req, res) => {
	let trainerCards = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].supertype === 'Trainer') trainerCards.push(cardData[i]);
	}
	res.status(200).json(trainerCards);
});

// @route     GET api/v1/pokemon/energy
// @desc      Get all energy cards
// @access    public
router.get('/energy', (req, res) => {
	let energyCards = [];
	for (let i = 0; i < cardData.length; i++) {
		if (cardData[i].supertype === 'Energy') energyCards.push(cardData[i]);
	}
	res.status(200).json(energyCards);
});

module.exports = router;
