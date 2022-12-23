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
    // 작은 화면에서 메뉴 클릭하면 네비 메뉴사라지도록
    navbarMenu.classList.remove("active");
  }
});

// 네비바의 토글 버튼 누르면 메뉴리스트 나오도록
const navToggleBtn = document.querySelector(".navbar__toggle_btn");
navToggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
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

// 프로젝트 버튼 클릭시 해당 프로젝트만 나오도록
const workBtnContainer = document.querySelector(".work__categories");
const workBtns = document.querySelectorAll(".category__btn");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
// class로  project를 가지는 모든 요소들을 배열화
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.work || e.target.parentNode.dataset.work;
  if (filter === undefined) {
    return;
  }
  // 프로젝트 버튼 클릭시 active 클래스 추가 제거
  const active = document.querySelector(".category__btn.active");
  active.classList.remove("active");
  const target = e.target.nodeName == "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("active");

  projectContainer.classList.add("anime-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.project) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anime-out");
  }, 200);
});
