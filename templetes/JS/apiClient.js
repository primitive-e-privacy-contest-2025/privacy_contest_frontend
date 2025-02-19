const apiClient = require('./axiosInstance');

// 회원가입 요청 함수
function userSignup(phone, username, pwd, email, name, birthdate, gender) {
    return apiClient.post('/userSignup', { phone, username, pwd, email, name, birthdate, gender });
}

// 로그인 요청 함수
function userLogin(username, password) {
    return apiClient.post('/userLogin', { username, password });
}

// 사업자 회원가입 요청 함수
function businSignup(businessRegistrationFile, businessRegNumber, businessName, phone, email, password, name) {
    const formData = new FormData();

    // 파일과 다른 데이터들을 formData에 추가
    formData.append('businessRegistrationFile', businessRegistrationFile);
    formData.append('businessRegNumber', businessRegNumber);
    formData.append('businessName', businessName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);

    // formData를 사용해 POST 요청
    return apiClient.post('/businSignup', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',  // 파일 포함 요청을 위한 헤더
        },
    });
}

function businLogin(businessRegNumber, otpNumber) {
    return apiClient.post('/businLogin', { businessRegNumber, otpNumber });
}

module.exports = { userSignup, userLogin, businSignup, businLogin };
