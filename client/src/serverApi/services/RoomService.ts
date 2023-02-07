import { AxiosResponse } from 'axios'
import $api from '../http'
import { RoomResponse, task } from './../models/response/RoomResponse'
export default class RoomService {
	static async getRoomData(link: string): Promise<AxiosResponse<RoomResponse>> {
		return $api.get<RoomResponse>(`/rooms/${link}/getData`)
	}

	static async addTask(
		link: string,
		task: task
	): Promise<AxiosResponse<RoomResponse>> {
		return $api.post<RoomResponse>(`/rooms/${link}/addTask`, { task })
	}

	static async deleteTask(
		link: string,
		task: task
	): Promise<AxiosResponse<RoomResponse>> {
		return $api.post<RoomResponse>(`/rooms/${link}/deleteTask`, { task })
	}

	static async setTaskType(
		link: string,
		type: string,
		task: task
	): Promise<AxiosResponse<RoomResponse>> {
		return $api.post<RoomResponse>(`/rooms/${link}/setTaskType`, { type, task })
	}
}
