document.addEventListener("DOMContentLoaded", function () {
  const eyeIcon = document.querySelector(".form-group .password-eye");
  const passwordInput = document.querySelector(".form-control-input.password");

  eyeIcon.addEventListener("click", function () {
    passwordInput.classList.toggle("active");

    if (passwordInput.classList.contains("active")) {
      this.className = "fa-solid fa-eye-slash";
      passwordInput.type = "text";
    } else {
      this.className = "fa-solid fa-eye";
      passwordInput.type = "password";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const eyeIcon = document.querySelector(".form-group .password-check-eye");
  const passwordInput = document.querySelector(
    ".form-control-input.password-check"
  );

  eyeIcon.addEventListener("click", function () {
    passwordInput.classList.toggle("active");

    if (passwordInput.classList.contains("active")) {
      this.className = "fa-solid fa-eye-slash";
      passwordInput.type = "text";
    } else {
      this.className = "fa-solid fa-eye";
      passwordInput.type = "password";
    }
  });
});
