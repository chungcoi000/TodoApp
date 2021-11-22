import {SET_TASK_LIST} from "../constants/ToDo";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_TASK_LIST:
			return [...action.payload];
		default:
			return state;

	}

};

export default reducer;