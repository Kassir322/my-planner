import { API_URL } from './../serverApi/http/index'
import { AuthResponse } from './../serverApi/models/response/AuthResponse'
import AuthService from '../serverApi/services/AuthService'
import { IUser } from './../serverApi/models/IUser'
import { makeAutoObservable } from 'mobx'
import pData from '../data/participants-data.json'
import tasksData from '../data/tasks-data.json'
import axios from 'axios'
import RoomService from '../serverApi/services/RoomService'

type task = {
	type: string
	title: string
	content: string
}

type participant = {
	ava: string
	name: string
}
export default class Store {
	// App variables ==========================================
	participants: participant[] = pData
	formData = {
		taskTitle: '',
		taskDescription: '',
		taskDedline: '',
	}
	setFormData(taskTitle: string, taskDescription: string, taskDedline: string) {
		this.formData = {
			taskTitle: taskTitle,
			taskDescription: taskDescription,
			taskDedline: taskDedline,
		}
	}
	form = {
		visibility: false,
		type: '',
	}
	tasks: task[] = tasksData
	taskInfo = {
		type: '',
		visibility: false,
		title: '',
		content: '',
	}

	// Server variables ==========================================
	user = {} as IUser
	isAuth = false
	isLoading = true

	constructor() {
		makeAutoObservable(this)
	}

	// Server functions ==========================================

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setUser(user: IUser) {
		this.user = user
	}

	setLoading(bool: boolean) {
		this.isLoading = bool
	}

	async login(email: string, password: string) {
		try {
			const response = await AuthService.login(email, password)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			await this.getRoomData()
		} catch (e) {
			console.log(e)
		}
	}

	async registration(email: string, password: string) {
		try {
			const response = await AuthService.registration(email, password)
			console.log(response)

			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			await this.getRoomData()
		} catch (e) {
			console.log(e)
		}
	}

	async logout() {
		try {
			const response = await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e) {
			console.log(e)
		}
	}

	async checkAuth() {
		try {
			const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
				withCredentials: true,
			})
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			await this.getRoomData()
		} catch (e) {
			console.log(e)
		} finally {
			this.setLoading(false)
		}
	}

	// My server functions ==========================================

	async getRoomData() {
		try {
			const response = await RoomService.getRoomData(this.user.rooms[0])
			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	// App functions ==========================================

	addParticipant(ava: string, name: string) {
		this.participants = [
			...this.participants,
			{
				ava: ava,
				name: name,
			},
		]
	}

	showForm(type: string) {
		this.form = {
			visibility: true,
			type: type,
		}
	}

	hideForm() {
		this.form = {
			visibility: false,
			type: '',
		}
		this.setFormData('', '', '')
	}

	filterTask(filterType: string) {
		return this.tasks.filter((obj: task) => obj.type === filterType)
	}

	addTask() {
		this.tasks = [
			...this.tasks,
			{
				type: this.form.type,
				title: this.formData.taskTitle,
				content: this.formData.taskDescription,
			},
		]
	}

	showTaskInfo(type: string, title: string, content: string) {
		this.taskInfo = {
			type: type,
			visibility: true,
			title: title,
			content: content,
		}
	}

	hideTaskInfo() {
		this.taskInfo = {
			type: '',
			visibility: false,
			title: '',
			content: '',
		}
	}

	setTaskType(type: string) {
		let newTasks = [...this.tasks]
		for (let i in newTasks) {
			if (this.taskInfo.title === newTasks[i].title) {
				if (this.taskInfo.content === newTasks[i].content) {
					newTasks[i].type = type
				}
			}
		}
		this.tasks = newTasks
		this.hideTaskInfo()
	}

	deleteTask() {
		this.tasks = this.tasks.filter(
			(obj) =>
				obj.title !== this.taskInfo.title &&
				obj.content !== this.taskInfo.content
		)
		this.hideTaskInfo()
	}
}
