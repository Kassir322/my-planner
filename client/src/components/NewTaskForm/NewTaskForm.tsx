import { log } from 'console'
import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Context } from '../..'
import './NewTaskForm.css'
import TaskRow from './TaskRow'

const NewTaskForm: FC = () => {
	const { store } = useContext(Context)

	const handleSubmit = (event: any) => {
		event.preventDefault()
		if (store.formData.taskTitle !== '') {
			store.addTask()
			console.log(store.formData)
			store.hideForm()
		} else {
			alert('У задачи должен быть заголовок')
		}
	}

	const onChangeHandler = (e: any) => {
		store.formData = {
			...store.formData,
			[e.target.name]: e.target.value,
		}
	}

	return (
		<>
			{store.form.visibility && (
				<div className="newtaskform">
					<h1 className="newtaskform__title">Новая задача</h1>
					<form
						onReset={() => store.hideForm()}
						onSubmit={handleSubmit}
						className="taskForm"
					>
						<TaskRow
							name="taskTitle"
							description={'Название задачи:'}
							onChangeInput={onChangeHandler}
						/>
						<TaskRow
							name="taskDescription"
							description={'Описание задачи:'}
							onChangeInput={onChangeHandler}
						/>
						<TaskRow
							name="taskDedline"
							description={'Дедлайн:'}
							onChangeInput={onChangeHandler}
						/>
						<div>
							<input type="submit" value="Отправить" />
							<input type="reset" value="Отменить" />
						</div>
					</form>
					{/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
				</div>
			)}
		</>
	)
}

export default observer(NewTaskForm)
