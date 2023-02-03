import { makeAutoObservable } from 'mobx'
import pData from '../data/participants-data.json'
import tasksData from '../data/tasks-data.json'

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
	testCount = 0

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

	constructor() {
		makeAutoObservable(this)
	}

	incCount() {
		this.testCount = this.testCount + 1
	}

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
