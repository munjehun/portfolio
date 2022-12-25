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
  const target = event.target;
  const link = event.target.dataset.link;
  if (link) {
    // 작은 화면에서 메뉴 클릭하면 네비 메뉴사라지도록
    navbarMenu.classList.remove("active");
    scrollIntoView(link);
    selectNavItem(target);
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

// 스크롤시 네비바의 해당 섹션에 active 되도록
// document.addEventListener("scroll", () => {
//   console.log(window.scrollY);
//   if (window.scrollY < 746) {
//     // data-link가 #home인 태그에 class에 active 추가
//     document.querySelector('[data-link="#home"]').classList.add("active");
//   } else if (746 < window.scrollY < 1591) {
//     document.querySelector('[data-link="#home"]').classList.remove("active");
//     document.querySelector('[data-link="#about"]').classList.add("active");
//   } else if (1591 < window.scrollY < 2314) {
//     document.querySelector('[data-link="#about"]').classList.remove("active");
//     document.querySelector('[data-link="#skills"]').classList.add("active");
//   } else if (2314 < window.scrollY < 2816) {
//     document.querySelector('[data-link="#skills"]').classList.remove("active");
//     document.querySelector('[data-link="#work"]').classList.add("active");
//   } else if (2816 < window.scrollY < 3398) {
//     document.querySelector('[data-link="#work"]').classList.remove("active");
//     document
//       .querySelector('[data-link="#testimonials"]')
//       .classList.add("active");
//   } else {
//     document
//       .querySelector('[data-link="#testimonials"]')
//       .classList.remove("active");
//     document.querySelector('[data-link="#contact"]').classList.add("active");
//   }
// });
// 👆 코드가 실행 될 때는 다른 코드가 실행되지 않는다.
// 싱글 스레드이기 때문에! ❌❌ 좋지 않은 코드
// 페이지 위에서 레이아웃이 발생하게 된다 ❌❌ 좋지 않은 코드
// 이벤트로 등록하는 콜백함수는 최대한 가벼워야 한다!

// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다.
const sectionId = [
  "#home",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];
const sections = sectionId.map((id) => document.querySelector(id));
const navItems = sectionId.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
let selectedNavIndex;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionId.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        //스크롤링이 위로 되어서 페이지가 내려감
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    //스크롤이 제일 위에 있을 때,
    selectedNavIndex = 0;
  } else if (
    //스크롤이 제일 아래에 있을 때
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  } // 스크롤이 중간일 때
  selectNavItem(navItems[selectedNavIndex]);
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
