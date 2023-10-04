
import { createSlice } from '@reduxjs/toolkit'
const val = Math.floor(Math.random() * 20);
localStorage.setItem('trace', val);
console.log("trace value is " + localStorage.getItem('trace'));
export const question_reducer = createSlice({
    name: 'questions',
    initialState: {
        queue: [],
        answers: [],
        trace: val,
    },
    reducers: {
        startExamAction: (state, action) => {
            let { question, answers } = action.payload
            return {
                ...state,
                queue: question,
                answers
            }
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1,
            }
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1 < 0 ? 0 : state.trace - 1,
            }
        },
        resetAllAction: () => {
            return {
                queue: [],
                answers: [],
                trace: val,
            }
        }
    }
});
export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = question_reducer.actions;

export default question_reducer.reducer;