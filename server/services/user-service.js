const UserModel = require('../models/user-model')
const bcrpyt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const userModel = require('../models/user-model')
const roomService = require('./room-service')

class UserService {
	async registration(email, password) {
		const candidate = await UserModel.findOne({ email })
		console.log(candidate)
		if (candidate) {
			throw ApiError.BadRequest(
				`Пользователь с таким почтовым адресом ${email} уже существует`
			)
		}
		const room = await roomService.createRoom(email)

		const hashPassword = await bcrpyt.hash(password, 3)
		const activationLink = uuid.v4()
		const user = await UserModel.create({
			email,
			password: hashPassword,
			activationLink,
			rooms: [room._id],
		})
		// await mailService.sendActivationMail(
		// 	email,
		// 	`${process.env.API_URL}/api/activate/${activationLink}`
		// )
		const userDto = new UserDto(user) // id, email, isActivated
		console.log({ ...userDto })
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async login(email, password) {
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw ApiError.BadRequest('Пользователь не был найден')
		}
		const isPassEquals = await bcrpyt.compare(password, user.password)
		if (!isPassEquals) {
			throw ApiError.BadRequest('Неверный пароль')
		}
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink })
		if (!user) {
			console.log(`error activate in user-service.js`)
			throw ApiError.BadRequest('Некорректная ссылка активации')
		}
		user.isActivated = true
		await user.save()
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)
		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError()
		}
		const user = await UserModel.findById(userData.id)
		const userDto = new UserDto(user)
		const tokens = tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {
			...tokens,
			user: userDto,
		}
	}

	async getAllUsers() {
		const users = await userModel.find()
		return users
	}
}

module.exports = new UserService()
