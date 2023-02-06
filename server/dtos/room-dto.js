module.exports = class RoomDto {
	name
	participants
	id
	tasks = {
		planned: [{}],
		doing: [{}],
		completed: [{}],
	}

	constructor(model) {
		this.name = model.name
		this.participants = model.participants
		this.id = model._id
		this.tasks = model.tasks
	}
}
