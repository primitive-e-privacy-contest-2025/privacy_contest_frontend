const backend_url = "https://primitive-backend.run.goorm.site";

function getValueById(id) {
    const element = document.getElementById(id);
    return element ? element.value : "";
}

async function handleSignin() {
    const signupData = {
        phoneNumber: getValueById("phoneNumber"),
        loginId: getValueById("loginId"),
        email: getValueById("email"),
        loginPw: getValueById("loginPw"),
        fullName: getValueById("fullName"),
        dateOfBirth: getValueById("dateOfBirth"),
    };

    try {
        const response = await fetch(`${backend_url}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
        });

        const responseData = await response.json();

        if (response.ok) {
            window.location.replace("user_login.html");
        } else {
            const errorMessage = responseData.message || response.status;
            alert(`회원가입 오류: ${errorMessage}`);
        }
    } catch (error) {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
    }
}

async function handleLogin() {
    const loginData = {
        loginId: getValueById("loginId"),
        loginPw: getValueById("loginPw"),
    };

    try {
        const response = await fetch(`${backend_url}/user/login`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {  // 응답 상태가 2xx가 아니면 처리
            const errorText = await response.text(); // 응답 텍스트를 먼저 확인
            console.error("로그인 오류:", errorText);
            alert(`로그인 실패: ${errorText}`);
            return;
        }

        const response_json = await response.json();
        console.log(response_json.access);

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = JSON.parse(atob(base64));

        localStorage.setItem("payload", JSON.stringify(jsonPayload));

        window.location.replace("User/dashboard_user_insight.html");
    } catch (error) {
        console.error("로그인 오류:", error);  // 오류를 더 명확하게 출력
        alert("로그인 중 오류가 발생했습니다.");
    }
}
