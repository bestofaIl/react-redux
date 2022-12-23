import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from "./store/actions";
import {initiateStore} from "./store/store";

const store = initiateStore();

function completeTask(taskId) {
    store.dispatch(actions.taskCompleted(taskId));
}

function changeTitle(taskId) {
    store.dispatch(actions.titleChanged(taskId));
}

function deleteTask(taskId) {
    store.dispatch(actions.taskDeleted(taskId));
}

const App = () => {

    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        })
    }, [])

    return <>
        <h1>App</h1>
        <ul>{state.map(elem => <li key={elem.id}>
            <p>{elem.title}</p>
            <p>{`Completed: ${elem.completed}`}</p>
            <button onClick={() => completeTask(elem.id)}>Complete</button>
            <button onClick={() => changeTitle(elem.id)}>Change title</button>
            <button onClick={() => deleteTask(elem.id)}>Delete</button>
            <hr/>
        </li>)}
        </ul>
    </>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


