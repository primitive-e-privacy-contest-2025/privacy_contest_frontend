axios.interceptors.request.use(config => {
    // 요청 전에 수행할 작업들
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
});

axios.interceptors.response.use(response => {
    // 응답을 가공하는 작업들
    response.data = response.data.results;
    return response;
});