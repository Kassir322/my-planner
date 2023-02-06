const roomService = require('../services/room-service')

class RoomController {
	async createRoom(req, res, next) {
		try {
			const { participantMail } = req.body
			const roomData = await roomService.createRoom(participantMail)
			return res.json(roomData)
		} catch (e) {
			next(e)
		}
	}

	async getRoomData(req, res, next) {
		try {
		} catch (e) {
			next(e)
		}
	}

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
