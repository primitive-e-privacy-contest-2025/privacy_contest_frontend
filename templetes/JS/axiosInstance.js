const axios = require('axios');

const apiClient = axios.create({
    baseURL: 'https://primitive-backend.run.goorm.site',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
    return config;
});

// 응답 인터셉터 추가
apiClient.interceptors.response.use(response => {
    response.data = response.data.results;
    return response;
});

module.exports = apiClient;
