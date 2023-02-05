import React, { FC } from 'react'
import './Participant.css'

export type participantProps = {
	ava: string
	name: string
}

export const Participant: FC<participantProps> = ({ ava, name }) => {
	return (
		<div className="participant">
			<div className="participant__img">
				<img src={require(`../png/${ava}.png`)}></img>
			</div>
			<div className="participant__name">{name}</div>
		</div>
	)
}
