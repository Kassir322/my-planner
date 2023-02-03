import React, { createContext, FC, useContext, useState } from 'react'
import participantsData from './data/participants-data.json'
import tasksData from './data/tasks-data.json'

const PlannerContext = createContext({})
export const usePlanner: any = () => {
	return useContext(PlannerContext)
}

type plannerProviderProps = {
	children: any
}

export const PlannerProvider: FC<plannerProviderProps> = ({ children }) => {
	const [participants, setParticipants] = useState(participantsData)

	const addParticipant = (ava: string, name: string) => {
		setParticipants([
			...participants,
			{
				ava: ava,
				name: name,
			},
		])
	}

	const [formData, setFormData] = useState({
		taskTitle: '',
		taskDescription: '',
		taskDedline: '',
	})

	const [form, setForm] = useState({
		visibility: false,
		type: '',
	})

	const showForm = (type: string) => {
		setForm({
			visibility: true,
			type: type,
		})
	}

	const hideForm = () => {
		setForm({
			visibility: false,
			type: '',
		})
	}

	const [tasks, setTasks] = useState(tasksData)

	const filterTask = (filterType: string) => {
		return tasks.filter((obj) => obj.type === filterType)
	}

	const addTask = () => {
		setTasks([
			...tasks,
			{
				type: form.type,
				title: formData.taskTitle,
				content: formData.taskDescription,
			},
		])
	}

	const [taskInfo, setTaskInfo] = useState({
		type: '',
		visibility: false,
		title: '',
		content: '',
	})

	const showTaskInfo = (type: string, title: string, content: string) => {
		setTaskInfo({
			type: type,
			visibility: true,
			title: title,
			content: content,
		})
	}

	const hideTaskInfo = () => {
		setTaskInfo({
			type: '',
			visibility: false,
			title: '',
			content: '',
		})
	}

	const setTaskType = (type: string) => {
		let newTasks = [...tasks]
		for (let i in newTasks) {
			console.log(newTasks[i])
			if (taskInfo.title === newTasks[i].title) {
				if (taskInfo.content === newTasks[i].content) {
					newTasks[i].type = type
				}
			}
		}
		setTasks(newTasks)
		hideTaskInfo()
	}

	const deleteTask = () => {
		setTasks(
			tasks.filter(
				(obj) =>
					obj.title !== taskInfo.title && obj.content !== taskInfo.content
			)
		)
		hideTaskInfo()
	}

	return (
		<PlannerContext.Provider
			value={{
				participants,
				addParticipant,
				form,
				showForm,
				hideForm,
				formData,
				setFormData,
				tasks,
				filterTask,
				addTask,
				taskInfo,
				showTaskInfo,
				hideTaskInfo,
				deleteTask,
				setTaskType,
			}}
		>
			{children}
		</PlannerContext.Provider>
	)
}
