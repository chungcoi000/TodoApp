import {SET_TASK_LIST} from "../constants/ToDo";

export const setTask = (storage) => {
	return {
		type: SET_TASK_LIST,
		payload: storage
	};
};


