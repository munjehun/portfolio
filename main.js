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

// 네비바 메뉴 선택시 이동
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const link = event.target.dataset.link;
  if (link) {
    console.log(link);
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});
