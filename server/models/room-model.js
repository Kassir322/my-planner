const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
	// roomId: { type: String, required: true, unique: true },
	participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	tasks: {
		type: {
			planned: {
				type: [
					{
						title: { type: String },
						description: { type: String },
					},
				],
			},
			doing: {
				type: [
					{
						title: { type: String },
						description: { type: String },
					},
				],
			},
			completed: {
				type: [
					{
						title: { type: String },
						description: { type: String },
					},
				],
			},
		},
	},
})

module.exports = model('Room', RoomSchema)
