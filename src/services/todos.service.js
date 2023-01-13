import httpService from "./http.service";

const todosEndpoint = "todos/";

const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todosEndpoint, {
            params: {
                _page: 1,
                _limit: 10
            }
        });
        return data;
    },
    addTask: async (payload) => {
        const { data } = await httpService.post(todosEndpoint, payload);
        console.log(data);
        return data;
    }
}

export default todosService;