import React, { FC, useContext } from 'react'
import ContentItem from './ContentItem'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'

const Content: FC = () => {
	const { store } = useContext(Context)
	return (
		<div className="content">
			<div className="container">
				<div className="content__inner">
					<div className="content__window">
						<h1 className="content__window__title">Предстоящее</h1>
						<div className="main__window__content">
							{store.room.tasks &&
								store.room.tasks.planned.map((obj) => (
									<ContentItem
										type="planned"
										title={obj.title}
										content={obj.description}
										key={obj.title}
									/>
								))}
						</div>
						<div
							className="addtask__btn"
							onClick={() => store.showForm('planned')}
						>
							+
						</div>
					</div>
					<div className="content__window">
						<h1 className="content__window__title">В процессе</h1>
						<div className="main__window__content">
							{store.room.tasks &&
								store.room.tasks.doing.map((obj) => (
									<ContentItem
										type="doing"
										title={obj.title}
										content={obj.description}
										key={obj.title}
									/>
								))}
						</div>
						<div
							className="addtask__btn"
							onClick={() => store.showForm('doing')}
						>
							+
						</div>
					</div>
					<div className="content__window">
						<h1 className="content__window__title">Выполнено</h1>
						<div className="main__window__content">
							{store.room.tasks &&
								store.room.tasks.completed.map((obj) => (
									<ContentItem
										type="completed"
										title={obj.title}
										content={obj.description}
										key={obj.title}
									/>
								))}
						</div>
						<div
							className="addtask__btn"
							onClick={() => store.showForm('completed')}
						>
							+
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(Content)
