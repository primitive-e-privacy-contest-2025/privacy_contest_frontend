const backend_url = "https://primitive-backend.run.goorm.site/";

async function api() {
    const apiKeyData = {
        name: document.getElementById("api_name").value, // API 키 이름
        user: document.getElementById("user").value, // 사용자 정보
        permissions: document.getElementById("permissions").value // 허가 정보
    };

    try {
        const response = await fetch(`${backend_url}/generate_api_key`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access")}` // 로그인 토큰 필요할 수도 있음
            },
            body: JSON.stringify(apiKeyData)
        });

        const responseData = await response.json();

        if (response.status === 201) { // 생성 성공
            alert("API 키가 생성되었습니다.");
            displayApiKey(responseData);
        } else {
            alert(`Error: ${responseData.message || response.status}`);
        }
    } catch (error) {
        console.error("API 키 생성 오류:", error);
        alert("API 키 생성 중 오류가 발생했습니다.");
    }
}

function displayApiKey(data) {
    const apiList = document.getElementById("api_list");
    const newRow = document.createElement("div");
    newRow.classList.add("api-row");

    newRow.innerHTML = `
        <h3>${data.name}</h3>
        <h3>${data.api_key}</h3>
        <h3>${data.last_used || "사용 기록 없음"}</h3>
        <h3>${data.user}</h3>
        <h3>${data.permissions}</h3>
    `;

    apiList.appendChild(newRow);
}

function openModal() {
    document.getElementById("serviceModal").style.display = "block";
}

function closeModal() {
    document.getElementById("serviceModal").style.display = "none";
}

function generateApiKey() {
    const randomApiKey = generateRandomString(16); // 16자리 무작위 API 키 생성
    document.getElementById("generated_api_key").textContent = randomApiKey;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

function registerService() {
    const serviceName = document.getElementById('name').value;
    const lastUsed = document.getElementById('last_used').value;
    const user = document.getElementById('user').value;
    const apiKey = document.getElementById('generated_api_key').textContent;

    const apiContainer = document.querySelector('.api');

    const newRow = document.createElement('div');
    newRow.classList.add('api_item');

        newRow.innerHTML = `
        <div>${serviceName}</div>
        <div>${apiKey || '없음'}</div>
        <div>${lastUsed}</div>
        <div>${user}</div>
        <div>허가 필요</div>
    `;

    apiContainer.appendChild(newRow);

    closeModal();
}


