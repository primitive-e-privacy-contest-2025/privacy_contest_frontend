const { userSignup } = require('./apiClient');

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form[name='form1']").addEventListener("submit", function (event) {
        event.preventDefault();

        // 입력값 가져오기
        const phone = document.getElementById("phone").value;
        const username = document.getElementById("id").value;
        const password = document.getElementById("pwd").value;
        const email = document.getElementById("email").value;
        const name = document.querySelector("input[name='name']").value;
        const birthdate = document.querySelector("input[placeholder='YYYY.MM.DD']").value;

        // 성별 선택값 가져오기
        let gender = "";
        if (document.getElementById("female").classList.contains("active")) gender = "female";
        else if (document.getElementById("male").classList.contains("active")) gender = "male";
        else if (document.getElementById("secret").classList.contains("active")) gender = "secret";

        // 유효성 검사
        if (!phone || !username || !password || !email || !name || !birthdate) {
            alert("모든 필수 입력란을 채워주세요.");
            return;
        }

        // 회원가입 요청
        userSignup(phone, username, password, email, name, birthdate, gender)
            .then(response => {
                alert("회원가입 성공!");
                console.log(response.data);
                window.location.href = "user_login.html"; // 로그인 페이지로 이동
            })
            .catch(error => {
                alert("회원가입 실패: " + (error.response?.data || error.message));
            });
    });
});
