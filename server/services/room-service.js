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
				planned: [],
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
		return roomDto
	}

	async addTask(roomId, task) {
		const room = await roomModel.findById(mongoose.Types.ObjectId(roomId))
		if (!room) {
			throw ApiError.BadRequest('Команда не была найдена')
		}
		room.tasks[task.type] = [...room.tasks[task.type], task]

		await room.save()
		return room
	}

	async deleteTask(roomId, task) {
		let room = await roomModel.findById(mongoose.Types.ObjectId(roomId))
		if (!room) {
			throw ApiError.BadRequest('Команда не была найдена')
		}
		room.tasks[task.type] = room.tasks[task.type].filter(
			(taskFilter) =>
				taskFilter.title !== task.title &&
				taskFilter.description !== task.description
		)

		await room.save()
		return room
	}

	async setTaskType(roomId, type, task) {
		let room = await roomModel.findById(mongoose.Types.ObjectId(roomId))
		if (!room) {
			throw ApiError.BadRequest('Команда не была найдена')
		}
		const prevType = task.type
		task.type = type
		room.tasks[type] = [...room.tasks[type], task]
		room.tasks[prevType] = room.tasks[prevType].filter(
			(taskFilter) =>
				taskFilter.title !== task.title &&
				taskFilter.description !== task.description
		)

		await room.save()
		return room
	}
}

module.exports = new RoomService()
