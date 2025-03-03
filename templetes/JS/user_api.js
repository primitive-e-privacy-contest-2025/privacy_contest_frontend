const backend_url = "https://primitive-backend.run.goorm.site/";

// 회원가입 함수
async function handleSignin() {
    const signupData = new FormData();

    // 파일이 선택되었을 때만 추가
    const fileInput = document.querySelector("#file-input");
    if (fileInput.files.length > 0) {
        signupData.append("file_input", fileInput.files[0]);
    }

    signupData.append("business_reg_number", document.getElementById("business_reg_number").value);
    signupData.append("business_phone", document.getElementById("phone_number").value);
    signupData.append("email", document.getElementById("email").value);
    signupData.append("password", document.getElementById("password").value);
    signupData.append("name", document.getElementById("name").value);

    try {
        const response = await fetch(`${backend_url}/user_signup`, {
            method: "POST",
            body: signupData, // FormData는 Content-Type 자동 설정됨
        });

        const responseData = await response.json();

        if (response.status === 200) {
            window.location.replace(`${backend_url}/user_login.html`);
        } else {
            alert(`Error: ${responseData.message || response.status}`);
        }
    } catch (error) {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
    }
}

async function handleLogin() {
    console.log("handle login");

    const loginData = {
        id: document.getElementById("id").value,
        password: document.getElementById("password").value,
    };

    try {
        const response = await fetch(`${backend_url}/user_login`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(loginData)
        });

        const response_json = await response.json();
        console.log(response_json.access);

        if (response.status === 200) {
            localStorage.setItem("access", response_json.access);
            localStorage.setItem("refresh", response_json.refresh);

            const base64Url = response_json.access.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = JSON.parse(atob(base64));

            localStorage.setItem("payload", JSON.stringify(jsonPayload));
        } else {
            alert(`로그인 실패: ${response_json.message || response.status}`);
        }
    } catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 중 오류가 발생했습니다.");
    }
}
