import { FC } from 'react'
import './css/ParticipantWindow.css'
import { Participant, participantProps } from './Participant'
import { usePlanner } from '../MyHooks'
import prcpntBtn from '../png/addParticipant.png'

const ParticipantWindow: FC = () => {
	const { participants, addParticipant } = usePlanner()
	return (
		<div className="participants__window">
			<h1 className="participants__title">Участники</h1>
			<div className="participants__container">
				{participants.map((obj: participantProps, i: number) => (
					<Participant key={i} name={obj.name} ava={obj.ava} />
				))}
			</div>
			<div className="participant__add">
				<button onClick={() => addParticipant('ava1', 'added')}>
					<img src={prcpntBtn} />
				</button>
			</div>
		</div>
	)
}

export default ParticipantWindow
