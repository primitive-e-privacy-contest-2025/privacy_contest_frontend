const backend_url = "https://primitive-backend.run.goorm.site/";

async function handleSignin() {
    const gender = document.querySelector(".gender.selected")?.id || "";  // 선택된 성별 버튼 가져오기

    const signupData = {
        phone: document.getElementById("phone").value,
        id: document.getElementById("id").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        name: document.getElementById("name").value,
        birth: document.getElementById("birth").value,
        gender: gender
    };

    try {
        const response = await fetch(`${backend_url}/user_signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
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

// 성별 버튼 클릭 시 선택 효과 추가
document.querySelectorAll(".gender").forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelectorAll(".gender").forEach(b => b.classList.remove("selected"));
        this.classList.add("selected");
    });
});
