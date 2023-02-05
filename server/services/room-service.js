const ApiError = require('../exceptions/api-error')
const roomModel = require('../models/room-model')

class RoomService {
	async addTask(roomId, type, title, description) {
		const room = await roomModel.findOne({ roomId })
		if (!room) {
			throw ApiError.BadRequest('Команда не была найдена')
		}
		room.tasks[type] = [
			...room.tasks[type],
			{
				title,
				description,
			},
		]

		await room.save()

		return room
	}
}

module.exports = new RoomService()
