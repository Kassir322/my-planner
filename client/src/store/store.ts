import { API_URL } from './../serverApi/http/index'
import { AuthResponse } from './../serverApi/models/response/AuthResponse'
import AuthService from '../serverApi/services/AuthService'
import { IUser } from './../serverApi/models/IUser'
import { makeAutoObservable } from 'mobx'
import pData from '../data/participants-data.json'
// import tasksData from '../data/tasks-data.json'
import axios from 'axios'
import RoomService from '../serverApi/services/RoomService'
import {
	task as DBTask,
	task,
} from './../serverApi/models/response/RoomResponse'
type taskTypes = {
	planned: 'planned'
	doing: 'doing'
	completed: 'completed'
}

type Room = {
	name: string
	participants: [string]
	tasks: {
		planned: DBTask[]
		doing: DBTask[]
		completed: DBTask[]
	}
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
	// tasks: task[] = tasksData
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

	// My server variables ==========================================
	room = {} as Room

	setRoom(room: Room) {
		this.room = room
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
			this.setRoom(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	async addTask() {
		try {
			const newTask = {
				type: this.form.type,
				title: this.formData.taskTitle,
				description: this.formData.taskDescription,
			}
			const response = await RoomService.addTask(this.user.rooms[0], newTask)
			this.setRoom(response.data)

			// if (
			// 	newTask.type === 'planned' ||
			// 	newTask.type === 'doing' ||
			// 	newTask.type === 'completed'
			// ) {
			// 	this.room.tasks[newTask.type] = [
			// 		...this.room.tasks[newTask.type],
			// 		newTask,
			// 	]
			// }
		} catch (e) {
			console.log(e)
		}
	}

	async deleteTask() {
		const task: task = {
			type: this.taskInfo.type,
			title: this.taskInfo.title,
			description: this.taskInfo.content,
		}
		const response = await RoomService.deleteTask(this.user.rooms[0], task)
		this.setRoom(response.data)
		this.hideTaskInfo()
	}

	async setTaskType(type: string) {
		const task: task = {
			type: this.taskInfo.type,
			title: this.taskInfo.title,
			description: this.taskInfo.content,
		}
		const response = await RoomService.setTaskType(
			this.user.rooms[0],
			type,
			task
		)
		this.setRoom(response.data)
		this.hideTaskInfo()
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

	// filterTask(filterType: string) {
	// 	return this.tasks.filter((obj: task) => obj.type === filterType)
	// }

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

	// setTaskType(type: string) {
	// 	let newTasks = [...this.tasks]
	// 	for (let i in newTasks) {
	// 		if (this.taskInfo.title === newTasks[i].title) {
	// 			if (this.taskInfo.content === newTasks[i].content) {
	// 				newTasks[i].type = type
	// 			}
	// 		}
	// 	}
	// 	this.tasks = newTasks
	// 	this.hideTaskInfo()
	// }

	// deleteTask() {
	// 	this.tasks = this.tasks.filter(
	// 		(obj) =>
	// 			obj.title !== this.taskInfo.title &&
	// 			obj.content !== this.taskInfo.content
	// 	)
	// 	this.hideTaskInfo()
	// }
}
