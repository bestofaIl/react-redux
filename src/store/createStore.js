export function createStore(reducer, initialState) {
    let state = initialState;
    const listeners = [];

    function subscribe(listener) {
        listeners.push(listener);
    }

    function getState() {
        return state;
    }

    function dispatch(action) {
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }

    return {getState, dispatch, subscribe};
}