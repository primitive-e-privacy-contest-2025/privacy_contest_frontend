axios.get('https://primitive-backend.run.goorm.site')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        if (error.response) {
            // 응답 에러 처리
            throw new Error(error.response.status);
        } else if (error.request) {
            // 요청 에러 처리
            throw new Error(error.request);
        } else {
            // 기타 에러 처리
            throw new Error(error.message);
        }
    });