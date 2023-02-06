const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
	rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
})

module.exports = model('User', UserSchema)
