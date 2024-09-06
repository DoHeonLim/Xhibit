window.addEventListener("DOMContentLoaded", function () {
  const errorTitle = document.getElementsByClassName("error-title")[0];
  const errorMessage = document.getElementsByClassName("error-message")[0];

  // url에서 에러 코드와 메시지 추출
  const params = new URLSearchParams(window.location.search);
  const errorCode = params.get("code");

  if (errorCode === "404") {
    errorTitle.textContent = "404";
    errorMessage.textContent = "페이지를 찾을 수 없습니다.";
  } else if (errorCode === "403") {
    errorTitle.textContent = "403";
    errorMessage.textContent = "접근 권한이 없습니다.";
  }
});
