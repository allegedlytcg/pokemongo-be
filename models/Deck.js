const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
		required: true,
	},
	cards: [
		{
			id: String,
			name: String,
			nationalPokedexNumber: Number,
			imageUrl: String,
			imageUrlHiRes: String,
			types: [String],
			supertype: String,
			subtype: String,
			hp: String,
			retreatCost: [String],
			convertedRetreatCost: Number,
			number: String,
			artist: String,
			rarity: String,
			series: String,
			set: String,
			setCode: String,
			attacks: [
				{
					cost: [String],
					name: String,
					text: String,
					damage: String,
					convertedEnergyCost: Number,
				},
			],
			resistances: [
				{
					type: { type: String },
					value: String,
				},
			],
			weaknesses: [
				{
					type: { type: String },
					value: String,
				},
			],
		},
	],
});

module.exports = Deck = mongoose.model('deck', DeckSchema);
