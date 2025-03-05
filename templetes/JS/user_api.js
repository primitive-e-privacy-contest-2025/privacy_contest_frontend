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

        if (!response.ok) {
            const errorText = await response.text();
            console.error("로그인 오류:", errorText);
            alert(`로그인 실패: ${errorText}`);
            return;
        }

        const response_json = await response.json();
        console.log("Response JSON:", response_json);

        if (!response_json.access) {
            alert("서버에서 올바른 토큰을 받지 못했습니다.");
            return;
        }

        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        console.log("Access Token:", localStorage.getItem("access"));

        window.location.replace("dashboard_user_insight.html");
    } catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 중 오류가 발생했습니다.");
    }
}
