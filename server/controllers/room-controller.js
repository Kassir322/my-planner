const roomService = require('../services/room-service')

class RoomController {
	async createRoom(req, res, next) {}

	async addTask(req, res, next) {
		try {
			const { roomId, type, title, description } = req.body
			const roomData = await roomService.addTask(
				roomId,
				type,
				title,
				description
			)
			return res.json(roomData)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new RoomController()
