import React, { FC } from 'react'

const UnderHeader: FC = () => {
	return (
		<div className="underheader">
			<div className="container">
				<div className="underheader__leftbtns underheaderbnts">
					<a className="btn">Все задачи</a>
					<a className="btn">*</a>
					<a className="btn">Календарь</a>
				</div>
				<div className="underheader__middlebtns underheaderbnts">
					<div className="underheader__participants__icons">
						<img src={require(`../png/ava1.png`)} />
						<img src={require(`../png/ava2.png`)} />
						<img src={require(`../png/ava3.png`)} />
						<img src={require(`../png/ava2.png`)} />
						<img src={require(`../png/ava3.png`)} />
						<img src={require(`../png/ava2.png`)} />
						{/* max capacity 6 people */}
					</div>
					<img src={require(`../png/viewAllBtn.png`)} />
					<img src={require(`../png/addParticipantUnderHeader.png`)} />
					<img src={require(`../png/viewChat.png`)} />
				</div>
				<div className="underheader__leftbtns underheaderbnts">
					<a className="btn"> задачи</a>
					<a className="btn">*</a>
					<a className="btn">Календарь</a>
				</div>
			</div>
		</div>
	)
}

export default UnderHeader
