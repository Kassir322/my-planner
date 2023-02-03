import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import AppWrapper from './AppWrapper'
import NewTaskForm from './NewTaskForm/NewTaskForm'
import TaskInfo from './TaskInfo'

const App: FC = () => {
	return (
		<>
			<AppWrapper />

			<NewTaskForm />
			<TaskInfo />
		</>
	)
}

export default observer(App)
