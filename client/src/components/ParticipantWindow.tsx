import { FC, useContext } from 'react'
import './css/ParticipantWindow.css'
import { Participant, participantProps } from './Participant'
import prcpntBtn from '../png/addParticipant.png'
import { Context } from '..'
import { observer } from 'mobx-react-lite'

const ParticipantWindow: FC = () => {
	const { store } = useContext(Context)
	return (
		<div className="participants__window">
			<h1 className="participants__title">Участники</h1>
			<div className="participants__container">
				{store.participants.map((obj: participantProps, i: number) => (
					<Participant key={i} name={obj.name} ava={obj.ava} />
				))}
			</div>
			<div className="participant__add">
				<button onClick={() => store.addParticipant('ava1', 'added')}>
					<img src={prcpntBtn} />
				</button>
			</div>
		</div>
	)
}

export default observer(ParticipantWindow)
