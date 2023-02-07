export type task = {
	type: string
	title: string
	description: string
}

export interface RoomResponse {
	name: string
	participants: [string]
	tasks: {
		planned: [task]
		doing: [task]
		completed: [task]
	}
}
