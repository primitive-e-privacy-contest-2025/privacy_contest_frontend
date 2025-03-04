const backend_url = "https://primitive-backend.run.goorm.site";

async function handleSignin2() {
    const gender = document.querySelector(".gender.selected")?.id || "";

    const signupData = new FormData();

    signupData.append("file_input", document.querySelector("#file-input").files[0]);
    signupData.append("contactPhone", document.getElementById("business_reg_number").value);
    signupData.append("managerPhone", document.getElementById("phone_number").value);
    signupData.append("email", document.getElementById("email").value);
    signupData.append("loginPw", document.getElementById("password").value);
    signupData.append("managerName", document.getElementById("name").value);

    const fileInput = document.querySelector("#file-input");
    if (fileInput && fileInput.files.length > 0) {
        signupData.append("file_input", fileInput.files[0]);
    } else {
        console.error("파일 입력 요소가 없거나 파일이 선택되지 않았습니다.");
    }

    try {
        const response = await fetch(`${backend_url}/corporate/login`, {
            method: "POST",
            body: signupData,
        });

        const responseData = await response.json();

        if (response.status === 200) {
            window.location.replace(`${backend_url}/corporate/login`);
        } else {
            alert(`Error: ${responseData.message || response.status}`);
        }
    } catch (error) {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
    }
}
async function handleLogin2() {
    console.log("handle login");

    const loginData = {
        business_reg_number: document.getElementById("business_reg_number").value,
        business_phone: document.getElementById("phone_number").value,
    };

    try {
        const response = await fetch(`${backend_url}/corporate/login`, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(loginData)
        });

        const response_json = await response.json();

        if (!response.ok) {
            throw new Error(response_json.message || `HTTP error! Status: ${response.status}`);
        }

        console.log(response_json.access);

        if (response_json.access) {
            localStorage.setItem("access", response_json.access);
            localStorage.setItem("refresh", response_json.refresh);

            const base64Url = response_json.access.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = JSON.parse(atob(base64));

            localStorage.setItem("payload", JSON.stringify(jsonPayload));
        } else {
            throw new Error("Invalid access token");
        }

    } catch (error) {
        console.error("로그인 오류:", error);
        alert("로그인 중 오류가 발생했습니다. " + error.message);
    }
}


