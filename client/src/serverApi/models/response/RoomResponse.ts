export type task = {
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
