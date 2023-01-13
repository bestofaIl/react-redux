import {createSlice} from "@reduxjs/toolkit";
import todosService from "../services/todos.service";
import {setError} from "./error";

const initialState = {entities: [], isLoading: true};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        received(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        update(state, action) {
            const elementIndex = state.entities.findIndex(elem => elem.id === action.payload.id);
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            }
        },
        remove(state, action) {
            state.entities = state.entities.filter(elem => elem.id !== action.payload.id);
        },
        taskRequested(state) {
            state.isLoading = true;
        },
        taskRequestFailed(state) {
            state.isLoading = false;
        },
        add(state, action) {
            state.entities.push(action.payload);
        }
    }
})

const {actions, reducer: taskReducer} = taskSlice;
const {update, remove, received, taskRequested, taskRequestFailed, add} = actions;


export const loadTasks = () => async (dispatch) => {
    dispatch(taskRequested());
    try {
        const data = await todosService.fetch();
        dispatch(received(data));
        console.log(data);
    } catch (e) {
        dispatch(setError(e.message))
        dispatch(taskRequestFailed(e.message));
    }
}

export const completeTask = (id) => (dispatch) => {
    dispatch(update({id, completed: true}));
}

export function titleChanged(id) {
    return update({id, title: `New title for ${id}`});
}

export function taskDeleted(id) {
    return remove({id})
}

export const createTask = () => async (dispatch) => {
    const payload = {
        title: prompt("Write title:"),
        completed: false
    };
    try {
        const task = await todosService.addTask(payload);
        console.log(task);
        dispatch(add(task));
    } catch (e) {
        console.log(e);
    }
}


export const getTasks = () => (state) => state.tasks.entities;
export const getTasksLoadingStatus = () => (state) => state.tasks.isLoading;

// const taskReducer = createReducer(initialState, (builder) => {
//     builder
//         .addCase(update, (state, action) => {
//             const elementIndex = state.findIndex(elem => elem.id === action.payload.id);
//             state[elementIndex] = {
//                 ...state[elementIndex],
//                 ...action.payload
//             }
//         })
//         .addCase(remove, (state, action) => {
//             return state.filter(elem => elem.id !== action.payload.id);
//         })
// })


// function taskReducer(state = [], action) {
//     switch (action.type) {
//         case update.type: {
//             const newArray = [...state];
//             const elementIndex = newArray.findIndex(elem => elem.id === action.payload.id);
//             newArray[elementIndex] = {...newArray[elementIndex], ...action.payload};
//             return newArray;
//         }
//
//         case remove.type: {
//             return state.filter(elem => elem.id !== action.payload.id);
//         }
//
//         default:
//             return state;
//     }
// }

export default taskReducer;