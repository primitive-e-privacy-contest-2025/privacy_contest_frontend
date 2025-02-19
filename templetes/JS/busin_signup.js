import { businSignup } from './apiClient.js';  //

// 사업자 회원가입 POST 요청 함수
function Signup() {
    const formData = new FormData();

    // 사업자 등록증 파일
    const businessRegistrationFile = document.querySelector('#file-input').files[0];
    formData.append('businessRegistration', businessRegistrationFile);

    // 사업자 등록 번호
    const businessRegNumber = document.querySelector('#business-reg-number').value;  // 수정된 id로 변경
    formData.append('businessRegistrationNumber', businessRegNumber);

    // 법인명 또는 상호
    const businessName = document.querySelector('#business-name').value;
    formData.append('businessName', businessName);

    // 연락처
    const phone = document.querySelector('#phone-number').value;
    formData.append('phone', phone);

    // 이메일
    const email = document.querySelector('#email').value;
    formData.append('email', email);

    // 비밀번호
    const password = document.querySelector('#pwd').value;
    formData.append('password', password);

    // 이름
    const name = document.querySelector('#name').value;  // 수정된 id로 변경
    formData.append('name', name);

    // API 요청 보내기
    businSignup(formData)
        .then(response => {
            console.log('회원가입 성공:', response.data);
            // 성공 처리 (예: 리다이렉트)
        })
        .catch(error => {
            console.error('회원가입 실패:', error);
            // 실패 처리 (예: 에러 메시지 출력)
        });
}
