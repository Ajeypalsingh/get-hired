"use strict";

const loginBtn = document.getElementById("login");
let invalidMsg = document.querySelector(".message");

const login = [{ email: "login@email.com", password: "Login" }];

localStorage.setItem("login", JSON.stringify(login));

const loginDetails = JSON.parse(localStorage.getItem("login"));

function loginPage() {
  let email = document.querySelector(".email").value.trim();
  let password = document.querySelector(".password").value.trim();

  let message = "";
  let valid = true;

  for (const details of loginDetails) {
    const validEmail = `${details.email}`;
    const validPassword = `${details.password}`;

    if (email.length === 0) {
      message += "Email is required ";
      valid = false;
    } else if (email !== validEmail) {
      message += "Username or Password is invalid ";
      valid = false;
    }

    if (password.length === 0) {
      message += "Password is required ";
      valid = false;
    } else if (password !== validPassword) {
      message += "Username or Password is invalid ";
      valid = false;
    }

    if (!valid) {
      invalidMsg.classList.add("is-visible");
      invalidMsg.innerHTML = message;
    } else {
      password = "";
      email = "";
      window.location.replace("home.html");
    }
  }
}

loginBtn.addEventListener("click", () => {
  loginPage();
});
