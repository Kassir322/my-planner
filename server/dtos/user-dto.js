module.exports = class UserDto {
	email
	id
	isActivated
	rooms

	constructor(model) {
		this.email = model.email
		this.id = model._id
		this.isActivated = model.isActivated
		this.rooms = model.rooms
	}
}
