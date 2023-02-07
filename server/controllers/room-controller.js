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
			const roomId = req.params.link
			const roomData = await roomService.getRoomData(roomId)
			return res.json(roomData)
		} catch (e) {
			next(e)
		}
	}

	async addTask(req, res, next) {
		try {
			const roomId = req.params.link
			const { task } = req.body
			const roomData = await roomService.addTask(roomId, task)
			return res.json(roomData)
		} catch (e) {
			next(e)
		}
	}

	async deleteTask(req, res, next) {
		try {
			const roomId = req.params.link
			const { task } = req.body
			const roomData = await roomService.deleteTask(roomId, task)
			return res.json(roomData)
		} catch (e) {
			next(e)
		}
	}

	async setTaskType(req, res, next) {
		try {
			const roomId = req.params.link
			const { type, task } = req.body
			const roomData = await roomService.setTaskType(roomId, type, task)
			return res.json(roomData)
		} catch (e) {
			next(e)
		}
	}
}

module.exports = new RoomController()
