import { observer } from 'mobx-react-lite'
import React, { FC, useContext } from 'react'
import { Context } from '../..'

type contentItemProps = {
	type: string
	title: string
	content: string
}

const ContentItem: FC<contentItemProps> = ({ type, title, content }) => {
	const { store } = useContext(Context)
	const colorTypes: { [key: string]: string } = {
		planned: '#f1deff',
		doing: '#DFD6FF',
		completed: '#CBDAFF',
	}
	return (
		<div
			style={{ backgroundColor: colorTypes[type] }}
			className="content__item"
			onClick={() => {
				store.showTaskInfo(type, title, content)
			}}
		>
			<h1 className="item__title">{title}</h1>
			{content ? <div className="item__text">{content}</div> : null}
		</div>
	)
}

export default observer(ContentItem)
