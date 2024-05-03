// 유저 이메일
const inputEmail = document.querySelector("#email");

// 유저 네임
const inputPassword = document.querySelector("#password");

// 폼 sumbit 버튼
const submitButton = document.querySelector(".form-control-submit-button");

const form = document.getElementsByTagName("form")[0];

async function onLoginSubmit(e) {
  console.log(inputEmail.value, inputPassword.value);
  const BASE_URL = "http://localhost:8080";

  const baseInstance = await axios.create({
    baseURL: BASE_URL, // 기본 URL 설정
  });

  const response = await baseInstance.post(
    "/login",
    {
      email: inputEmail.value,
      password: inputPassword.value,
    },
    {
      headers: { "Content-Type": `application/json` },
    }
  );

  console.log(response); // response가 잘 들어왔는지 확인
}

form.addEventListener("submit", onLoginSubmit);
