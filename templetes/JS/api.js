document.addEventListener('DOMContentLoaded', () => {
    // 서비스 정보를 받아오는 API 호출 (주어진 URL을 사용)
    axios.get('https://primitive-backend.run.goorm.site/api/services') // 실제 API URL을 사용
        .then(response => {
            // 데이터를 성공적으로 받아왔을 때 처리
            updateServiceData(response.data);
        })
        .catch(error => {
            console.error('서비스 데이터를 불러오는 데 오류가 발생했습니다:', error);
        });
});

// 받아온 데이터를 box-container에 동적으로 추가하는 함수
function updateServiceData(services) {
    const container = document.querySelector('.box-container'); // 서비스 박스가 들어갈 컨테이너

    // 기존 콘텐츠 비우기
    container.innerHTML = '';

    // 서비스 데이터로 새로운 박스 생성
    services.forEach(service => {
        const serviceBox = document.createElement('div');
        serviceBox.classList.add('service-box');

        // 서비스 데이터 넣기
        serviceBox.innerHTML = `
            <p><strong>서비스 이름:</strong> ${service.name}</p>
            <p><strong>API 키:</strong> ${service.apiKey}</p>
            <p><strong>마지막 사용일:</strong> ${service.lastUsed}</p>
            <p><strong>사용자:</strong> ${service.user}</p>
            <p><strong>허가:</strong> ${service.permission}</p>
        `;

        // 박스를 컨테이너에 추가
        container.appendChild(serviceBox);
    });
}
