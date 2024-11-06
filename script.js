window.onload = function() {
    // 로딩 화면에서 메인 화면으로 자동 전환
    setTimeout(() => {
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("mainScreen").style.display = "flex";
    }, 3000); // 로딩 시간 3초
};

document.getElementById("startButton").addEventListener("click", function() {
    // 외출 시작하기 버튼을 누르면 주변 소음 인식 화면으로 전환
    document.getElementById("mainScreen").style.display = "none";
    document.getElementById("noiseScreen").style.display = "flex";
});

document.getElementById("backButton").addEventListener("click", function() {
    // 주변 소음 인식 화면에서 뒤로 가기 버튼을 누르면 메인 화면으로 돌아감
    document.getElementById("noiseScreen").style.display = "none";
    document.getElementById("mainScreen").style.display = "flex";
});
