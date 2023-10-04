import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';

const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer,
});


const store = configureStore({
    reducer: rootReducer,
});

export default store;
