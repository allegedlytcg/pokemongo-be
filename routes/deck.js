const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Deck = require('../models/Deck');
const User = require('../models/User');

// @route     GET api/profile/me
// @desc      Get current users deck
// @access    private
router.get('/me', auth, async (req, res) => {
	try {
		let deck = await Deck.find({ user: req.user.id });
		if (!deck) {
			return res.status(404).json({ message: 'deck for user not found' });
		}
		res.status(200).json(deck);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('server errror');
	}
});

// @route     POST api/deck/
// @desc      create deck
// @access    private
router.post('/', auth, async (req, res) => {
	const { name, cards } = req.body;
	try {
		let deck = new Deck({
			user: req.user.id,
			name,
			cards,
		});
		await deck.save();
		res.status(201).json(deck);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('server errror');
	}
});

// @route     DELETE api/deck/:id
// @desc      delete deck by id
// @access    private
router.delete('/:id', auth, async (req, res) => {
	try {
		await Deck.findOneAndDelete({ _id: req.params.id });
		res.json({ message: 'user successfully deleted' });
	} catch (error) {
		console.log(error.message);
		res.status(500).send('server errror');
	}
});

// @route     PUT api/deck/
// @desc      edit deck by id
// @access    private
router.put('/:id', auth, async (req, res) => {
	// const { name, cards } = req.body;
	try {
		let deck = await Deck.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true },
		);

		res.status(201).json(deck);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('server errror');
	}
});

module.exports = router;
