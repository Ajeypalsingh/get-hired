"use strict";

const today = new Date();
const postFile = document.querySelector("#image-input");
const textarea = document.querySelector("textarea");
const connections = document.querySelector(".people-container");
const feedStream = document.querySelector(".feed-stream");
const postBtn = document.querySelector(".fa-paper-plane");
const error = document.querySelector(".dialog-error");
const url = "https://randomuser.me/api/?nat=CA&results=10";
const options = {
  method: "GET",
  mode: "cors",
};
let hour = today.getHours().toString();
let minutes = today.getMinutes().toString().padStart("2", 0);
let day = today.toDateString();
window.URL = window.URL || window.webkitURL;

postBtn.addEventListener("click", () => {
  const message = document.querySelector(".message").value;
  let content = document.createElement("div");
  content.classList.add("feed");

  if (message.length < 1) {
    error.showModal();
    setTimeout(() => {
      error.close();
    }, 1);
    return;
  }

  try {
    let imageURL = URL.createObjectURL(postFile.files[0]);
    content.innerHTML = `
        <div class="user-info">
            <figure>
                <img src="assets/images/me.jpeg" alt="">
                <h5>Ajeypal</h5>
            </figure>
            <small class="bold gray">${day.slice(
              0,
              15
            )}, ${hour}:${minutes}</small>
        </div>
        <p>
            ${message}
        </p>
        <figure class="image-post">
            <img src="${imageURL}">
        </figure>
        <div class="likes-comments">
            <p><i class="fa-regular fa-heart"></i> 234</p>
            <p><i class="fa-regular fa-comments"></i> 68</p>
            <p><i class="fa-solid fa-share"></i> Share</p>
        </div>
        `;

    textarea.value = "";
    feedStream.prepend(content);
  } catch {
    content.innerHTML = `
        <div class="user-info">
            <figure>
                <img src="assets/images/me.jpeg" alt="">
                <h5>Ajeypal</h5>
            </figure>
            <small class="bold gray">${day.slice(
              0,
              15
            )}, ${hour}:${minutes}</small>
        </div>
        <p>
            ${message}
        </p>
        <div class="likes-comments">
            <p><i class="fa-regular fa-heart"></i> 234</p>
            <p><i class="fa-regular fa-comments"></i> 68</p>
            <p><i class="fa-solid fa-share"></i> Share</p>
        </div>
        `;

    textarea.value = "";
    feedStream.prepend(content);
  }
});

async function getUsers() {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.log(error.message);
    }

    let users = await response.json();
    for (let i = 0; i < users.results.length; i++) {
      connections.innerHTML += `
            <div class="other-users-box">
                <figure>
                    <img src="${users.results[i].picture.large}" class="users-profile-pic">
                </figure>
                <article>
                    <small class="bold size">${users.results[i].name.first} ${users.results[i].name.last}</small>
                    <small class="bold gray">${users.results[i].location.city}, CA</small>
                </article>
                <div><i class="fa-solid fa-user-plus"></i></div>
            </div>
            `;
    }
  } catch (error) {
    console.log(error.message);
  }
}

getUsers();
