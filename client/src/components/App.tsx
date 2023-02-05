import { observer } from 'mobx-react-lite'
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..'
import AppWrapper from './AppWrapper'
import LoginForm from './loginForm/LoginForm'
import NewTaskForm from './NewTaskForm/NewTaskForm'
import TaskInfo from './TaskInfo'

const App: FC = () => {
	const { store } = useContext(Context)

	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth().then(() => store.setLoading(false))
		} else {
			store.setLoading(false)
		}
	}, [])

	if (store.isLoading) {
		return <div>Загрузка...</div>
	} else if (!store.isAuth) {
		return <LoginForm />
	} else {
		return (
			<>
				<AppWrapper />
				<NewTaskForm />
				<TaskInfo />
			</>
		)
	}
}

export default observer(App)
