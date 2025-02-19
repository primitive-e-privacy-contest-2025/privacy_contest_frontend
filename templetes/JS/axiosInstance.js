const axios = require('axios');

const apiClient = axios.create({
    baseURL: 'https://primitive-backend.run.goorm.site',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

module.exports = apiClient;