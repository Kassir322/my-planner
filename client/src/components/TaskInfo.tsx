import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { Context } from '..'
import './css/TaskInfo.css'

const TaskInfo: FC = () => {
	const { store } = useContext(Context)
	return (
		<>
			{store.taskInfo.visibility && (
				<div className="taskinfo">
					<div className="closeinfo">
						<button onClick={() => console.log('Will be soon!')}>fav</button>
						<button onClick={() => store.hideTaskInfo()}>X</button>
					</div>
					<div className="info">
						<h1>{store.taskInfo.title}</h1>
						<div>{store.taskInfo.content}</div>
					</div>
					<div className="actions">
						{(store.taskInfo.type === 'planned' ||
							store.taskInfo.type === 'doing') && (
							<button onClick={() => store.setTaskType('completed')}>
								Выполнено
							</button>
						)}
						{store.taskInfo.type === 'planned' && (
							<button onClick={() => store.setTaskType('doing')}>
								Выполнять
							</button>
						)}
						<button
							onClick={() => {
								store.deleteTask()
								console.log(store.tasks)
							}}
						>
							Удалить
						</button>
					</div>
				</div>
			)}
		</>
	)
}
export default observer(TaskInfo)
