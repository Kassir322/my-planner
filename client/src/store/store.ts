import { makeObservable } from 'mobx'

export default class Store {
	constructor() {
		makeObservable(this)
	}
}
