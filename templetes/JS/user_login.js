const { userLogin } = require('./apiClient');

// 로그인 폼 이벤트 처리
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form[name='form1']").addEventListener("submit", function (event) {
        event.preventDefault(); // 기본 제출 방지

        // 입력값 가져오기
        const username = document.getElementById("id").value;
        const password = document.getElementById("pwd").value;

        // 유효성 검사
        if (!username || !password) {
            alert("아이디와 비밀번호를 모두 입력해주세요.");
            return;
        }

        // 로그인 요청
        login(username, password)
            .then(response => {
                console.log(response.data);
                alert("로그인 성공!");
                // 로그인 성공 후 페이지 이동 (예: 메뉴 페이지)
                window.location.href = "index.html";
            })
            .catch(error => {
                alert("로그인 실패: " + (error.response?.data || error.message));
            });
    });
});
