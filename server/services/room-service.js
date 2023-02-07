const ApiError = require('../exceptions/api-error')
const roomModel = require('../models/room-model')
const uuid = require('uuid')
const { default: mongoose } = require('mongoose')
const RoomDto = require('../dtos/room-dto')

class RoomService {
	async createRoom(participantMail) {
		// const candidate = await UserModel.findOne({ roomId })
		// if (candidate) {
		// 	throw ApiError.BadRequest(`Комната с таким id ${roomId} уже существует`)
		// }

		const room = await roomModel.create({
			name: `Команда ${participantMail}`,
			participants: [participantMail],
			tasks: {
				planned: [{ title: 'planned title1', description: 'planned descr1' }],
				doing: [],
				completed: [],
			},
		})
		return room
	}

	async getRoomData(roomId) {
		const room = await roomModel.findById(mongoose.Types.ObjectId(roomId))
		if (!room) {
			throw ApiError.BadRequest('Команда не была найдена')
		}
		const roomDto = new RoomDto(room)
		// console.log(roomDto.tasks.planned)
		return roomDto
	}

	async addTask(roomId, type, title, description) {
		const room = await roomModel.findById(mongoose.Types.ObjectId(roomId))
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
