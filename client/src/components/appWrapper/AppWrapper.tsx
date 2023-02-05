import React, { FC } from 'react'
import './AppWrapper.css'
import UnderHeader from '../underHeader/UnderHeader'
import Header from '../header/Header'
import Content from '../Content/Content'
import { observer } from 'mobx-react-lite'

const AppWrapper: FC = () => {
	return (
		<div className="app__wrapper">
			<div className="app__wrapper__inner">
				<Header />
				<UnderHeader />
				<Content />
			</div>
		</div>
	)
}
export default observer(AppWrapper)
