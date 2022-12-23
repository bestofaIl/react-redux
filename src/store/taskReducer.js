import {taskDeleted, taskUpdated} from "./actionTypes";


export function taskReducer(state = [], action) {
    switch (action.type) {
        case taskUpdated: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(elem => elem.id === action.payload.id);
            newArray[elementIndex] = {...newArray[elementIndex], ...action.payload};
            return newArray;
        }

        case taskDeleted: {
            const elementIndex = state.findIndex(elem => elem.id === action.payload.id);
            let newArray = state.filter((elem, index) => index !== elementIndex);
            return newArray;
        }

        default:
            return state;
    }
}