import { AxiosResponse } from 'axios'
import $api from '../http'
import { RoomResponse } from './../models/response/RoomResponse'
export default class RoomService {
	static async getRoomData(link: string): Promise<AxiosResponse<RoomResponse>> {
		return $api.get<RoomResponse>(`/rooms/${link}/getData`)
	}

	static async addTask(
		link: string,
		type: string,
		title: string,
		description: string
	): Promise<AxiosResponse<RoomResponse>> {
		return $api.post<RoomResponse>(`/rooms/${link}/addTask`, {
			type,
			title,
			description,
		})
	}
}
