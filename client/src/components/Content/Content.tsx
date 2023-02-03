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
							{store.filterTask('planned').map((obj, i) => (
								<ContentItem
									type={'planned'}
									content={obj.content}
									title={obj.title}
									key={i}
								/>
							))}
							<div
								className="addtask__btn"
								onClick={() => store.showForm('planned')}
							>
								+
							</div>
						</div>
					</div>
					<div className="content__window">
						<h1 className="content__window__title">В процессе</h1>
						<div className="main__window__content">
							{store.filterTask('doing').map((obj, i) => (
								<ContentItem
									type={'doing'}
									content={obj.content}
									title={obj.title}
									key={i}
								/>
							))}
							<div
								className="addtask__btn"
								onClick={() => store.showForm('doing')}
							>
								+
							</div>
						</div>
					</div>
					<div className="content__window">
						<h1 className="content__window__title">Выполнено</h1>
						<div className="main__window__content">
							{store.filterTask('completed').map((obj, i) => (
								<ContentItem
									type={'completed'}
									content={obj.content}
									title={obj.title}
									key={i}
								/>
							))}
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
		</div>
	)
}

export default observer(Content)
