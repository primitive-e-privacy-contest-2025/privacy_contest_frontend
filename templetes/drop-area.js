const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const imagePreview = document.getElementById("image-preview");

// 드래그 앤 드롭 이벤트 처리
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#eee";
});

dropArea.addEventListener("dragleave", () => {
    dropArea.style.backgroundColor = "#fff";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.style.backgroundColor = "#fff";
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image")) {
        displayImage(file);
    }
});

// 파일 입력 필드 변경 이벤트 처리
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file && file.type.startsWith("image")) {
        displayImage(file);
    }
});

// 클릭 이벤트 처리
dropArea.addEventListener("click", () => {
    fileInput.click();
});

// 이미지 표시 함수
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = () => {
        imagePreview.src = reader.result;
        imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
}