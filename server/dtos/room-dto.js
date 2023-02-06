module.exports = class RoomDto {
	participants
	id
	tasks = {
		planned: [{}],
		doing: [{}],
		completed: [{}],
	}

	constructor(model) {
		this.participants = model.participants
		this.id = model._id
		this.tasks = model.tasks
	}
}
