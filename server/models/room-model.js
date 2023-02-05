const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
	roomId: { type: String, required: true, unique: true },
	participants: { type: [{ participantId: { type: String, required: true } }] },
	tasks: {
		type: {
			planned: {
				type: [
					{
						title: { type: String, required: true },
						description: { type: String },
					},
				],
			},
			doing: {
				type: [
					{
						title: { type: String, required: true },
						description: { type: String },
					},
				],
			},
			completed: {
				type: [
					{
						title: { type: String, required: true },
						description: { type: String },
					},
				],
			},
		},
	},
})

module.exports = model('Room', RoomSchema)
