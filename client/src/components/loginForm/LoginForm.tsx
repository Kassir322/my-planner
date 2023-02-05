import { observer } from 'mobx-react-lite'
import { FC, useContext, useState } from 'react'
import { Context } from '../..'
import './LoginForm.css'

const LoginForm: FC = () => {
	const [email, SetEmail] = useState<string>('')
	const [password, SetPassword] = useState<string>('')
	const { store } = useContext(Context)
	return (
		<div className="loginform">
			<input
				onChange={(e) => SetEmail(e.target.value)}
				value={email}
				type="text"
				placeholder="Email"
			/>
			<input
				onChange={(e) => SetPassword(e.target.value)}
				value={password}
				type="text"
				placeholder="Пароль"
			/>
			<button onClick={() => store.login(email, password)}>Логин</button>
			<button onClick={() => store.registration(email, password)}>
				Регистрация
			</button>
		</div>
	)
}

export default observer(LoginForm)
