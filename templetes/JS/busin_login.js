import { businLogin } from './apiClient.js';

// 기업 회원 로그인 요청 함수
function businLogin() {
    const businessRegNumber = document.querySelector('#brnum').value;
    const otpNumber = document.querySelector('#OTPnum').value;

    // 유효성 검사 (예시로 간단한 체크 추가)
    if (!businessRegNumber || !otpNumber) {
        alert('모든 필드를 입력하세요.');
        return;
    }

    // API 요청 보내기
    businLogin(businessRegNumber, otpNumber)
        .then(response => {
            console.log('로그인 성공:', response.data);
            // 성공 처리 (예: 리다이렉트 또는 알림)
        })
        .catch(error => {
            console.error('로그인 실패:', error);
            // 실패 처리 (예: 에러 메시지 출력)
        });
}

// submitBusinLogin 함수 실행 (form에서 onsubmit 이벤트로 호출)
document.querySelector('form').onsubmit = (event) => {
    event.preventDefault();
    businLogin();
};
