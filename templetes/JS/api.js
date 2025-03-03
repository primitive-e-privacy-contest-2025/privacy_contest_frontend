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

// 모달 열기
function openModal() {
    document.getElementById("serviceModal").style.display = "block";
}

// 모달 닫기
function closeModal() {
    document.getElementById("serviceModal").style.display = "none";
}

// 무작위 API 키 생성
function generateApiKey() {
    const randomApiKey = generateRandomString(16); // 16자리 무작위 API 키 생성
    document.getElementById("generated_api_key").textContent = randomApiKey;
}

// 무작위 문자열 생성 함수
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
    // 입력된 값 가져오기
    const serviceName = document.getElementById('name').value;
    const lastUsed = document.getElementById('last_used').value;
    const user = document.getElementById('user').value;
    const apiKey = document.getElementById('generated_api_key').textContent; // 생성된 API 키

    // .api div 안에 있는 api_header 바로 아래에 새로운 항목 추가
    const apiContainer = document.querySelector('.api');

    // 새로운 행(row) 추가
    const newRow = document.createElement('div');
    newRow.classList.add('api_item'); // 새로운 클래스 추가

    // 새 항목의 HTML 구성
        newRow.innerHTML = `
        <div>${serviceName}</div>
        <div>${apiKey || '없음'}</div>
        <div>${lastUsed}</div>
        <div>${user}</div>
        <div>허가 필요</div>
    `;


    // .api div 안에서 hr 태그 아래에 항목 삽입
    apiContainer.appendChild(newRow);  // appendChild로 hr 아래에 추가

    // 모달 닫기
    closeModal();
}


