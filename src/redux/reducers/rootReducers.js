import { combineReducers } from 'redux';
import Task from './todosReducers';

const rootReducer = combineReducers({
	task: Task
});

export default rootReducer;