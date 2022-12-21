"use strict";

// 네비바 투명-불투명화
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

function scrollIntoView(selector) {
  const contact = document.querySelector(selector);
  contact.scrollIntoView({ behavior: "smooth" });
}
// 네비바 메뉴 선택시 이동
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link) {
    scrollIntoView(link);
  }
});

// Home의 Contact Me 버튼 시 Contact로 이동
const contactBtn = document.querySelector(".home__contact");
contactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// 스크롤시 Home화면 투명해지게
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤시 맨 위로 올라가는 버튼 만들기
const toTopArrow = document.querySelector(".toTopArrow");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    toTopArrow.classList.add("visible");
  } else {
    toTopArrow.classList.remove("visible");
  }
});
toTopArrow.addEventListener("click", () => {
  scrollIntoView("#home");
});
