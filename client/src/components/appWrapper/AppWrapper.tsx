import React, { FC, useContext } from 'react'
import './AppWrapper.css'
import UnderHeader from '../underHeader/UnderHeader'
import Header from '../header/Header'
import Content from '../Content/Content'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'

const AppWrapper: FC = () => {
	const { store } = useContext(Context)
	return (
		<div className="app__wrapper">
			<div className="app__wrapper__inner">
				{/* <Header /> */}
				<button onClick={() => store.logout()}>Выйти</button>
				{/* <UnderHeader /> */}
				<div>(Underheader)</div>
				<Content />
			</div>
		</div>
	)
}
export default observer(AppWrapper)
