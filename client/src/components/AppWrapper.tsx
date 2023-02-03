import React, { FC } from 'react'
import './css/AppWrapper.css'
import UnderHeader from './UnderHeader'
import Header from './Header'
import Content from './Content/Content'

const AppWrapper: FC = () => {
	return (
		<div className="app__wrapper">
			<div className="app__wrapper__inner">
				<Header />
				{/* <UnderHeader /> */}
				<Content />
			</div>
		</div>
	)
}
export default AppWrapper
