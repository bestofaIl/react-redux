import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {
    completeTask,
    titleChanged,
    taskDeleted,
    getTasks,
    loadTasks,
    getTasksLoadingStatus,
    createTask
} from "./store/task";
import configureStore from "./store/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import {getErrors} from "./store/error";

const store = configureStore();


const App = () => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getErrors());
    const dispatch = useDispatch();

    function changeTitle(taskId) {
        dispatch(titleChanged(taskId));
    }

    function deleteTask(taskId) {
        dispatch(taskDeleted(taskId));
    }

    useEffect(() => {
        dispatch(loadTasks());
    }, [])

    if (isLoading) return <h1>Loading...</h1>;
    if (error[0]) return <p>{error[0]}</p>;

    return <>
        <h1>App</h1>
        <button onClick={() => dispatch(createTask())}>Add task</button>
        <ul>{state.map(elem => <li key={elem.id}>
            <p>{elem.title}</p>
            <p>{`Completed: ${elem.completed}`}</p>
            <button onClick={() => dispatch(completeTask(elem.id))}>Complete</button>
            <button onClick={() => changeTitle(elem.id)}>Change title</button>
            <button onClick={() => deleteTask(elem.id)}>Delete</button>
            <hr/>
        </li>)}
        </ul>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);


