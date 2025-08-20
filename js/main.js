const theme = "theme";
const dataTheme = "data-theme";
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";

const web = "web";
const app = "app";
const ui = "ui";
const webDevelopment = "Web Development";
const appDevelopment = "App Development";
const uiDesign = "UI Design";
const img = [
  "./assets/images/portfolio-1.jpg",
  "./assets/images/portfolio-2.jpg",
  "./assets/images/portfolio-3.jpg",
  "./assets/images/portfolio-4.jpg",
  "./assets/images/portfolio-5.jpg",
  "./assets/images/portfolio-6.jpg",
  "./assets/images/portfolio-7.jpg",
  "./assets/images/portfolio-8.jpg",
];

const modalOpen = "[data-open]";
const modalClose = "[data-close]";
const isVisible = "is-visible";

const portfolioGridId = document.getElementById("portfolio-grid");
const modalContainerId = document.getElementById("modal-container");
const dataFilter = "[data-filter]";
const portfolioData = "[data-item]";
const portfolioDataArray = [
  {
    dataType: web,
    id: "web-1",
    imgSrc: img[0],
    cardCategory: webDevelopment,
    cardTitle: "Food Website",
  },
  {
    dataType: web,
    id: "web-2",
    imgSrc: img[1],
    cardCategory: webDevelopment,
    cardTitle: "Skate Website",
  },
  {
    dataType: web,
    id: "web-3",
    imgSrc: img[2],
    cardCategory: webDevelopment,
    cardTitle: "Eating Website",
  },
  {
    dataType: ui,
    id: "ui-1",
    imgSrc: img[3],
    cardCategory: uiDesign,
    cardTitle: "Cool Website",
  },
  {
    dataType: app,
    id: "app-1",
    imgSrc: img[4],
    cardCategory: appDevelopment,
    cardTitle: "Game Website",
  },
  {
    dataType: app,
    id: "app-2",
    imgSrc: img[5],
    cardCategory: appDevelopment,
    cardTitle: "Gambling Website",
  },
  {
    dataType: app,
    id: "app-3",
    imgSrc: img[6],
    cardCategory: appDevelopment,
    cardTitle: "Money Website",
  },
  {
    dataType: ui,
    id: "ui-2",
    imgSrc: img[7],
    cardCategory: uiDesign,
    cardTitle: "Fantastic Website",
  },
];

const modalArray = [];

// Add items in the portfolio with its styles
portfolioDataArray.forEach((data) => {
  const portfolioCardElement = document.createElement("div");
  portfolioCardElement.setAttribute("data-item", data.dataType);
  portfolioCardElement.setAttribute("class", "portfolio-card");
  portfolioCardElement.setAttribute("data-open", data.id);

  const cardBodyElement = document.createElement("div");
  cardBodyElement.setAttribute("class", "card-body");

  portfolioCardElement.appendChild(cardBodyElement);

  const cardImageElement = document.createElement("img");
  cardImageElement.setAttribute("src", data.imgSrc);
  cardImageElement.setAttribute("alt", "portfolio icon");

  const cardPopupElement = document.createElement("div");
  cardPopupElement.setAttribute("class", "card-popup-box");

  cardBodyElement.appendChild(cardImageElement);
  cardBodyElement.appendChild(cardPopupElement);

  const cardCategoryElement = document.createElement("div");
  cardCategoryElement.innerHTML = data.cardCategory;
  const cardTitleElement = document.createElement("h3");
  cardTitleElement.innerHTML = data.cardTitle;

  cardPopupElement.appendChild(cardCategoryElement);
  cardPopupElement.appendChild(cardTitleElement);

  portfolioGridId.appendChild(portfolioCardElement);

  modalArray.push(portfolioCardElement);
});

/* Theme */
const toggleTheme = document.querySelector(themeTab);
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/* Modal */
const openModal = document.querySelectorAll(modalOpen);
let closeModal = document.querySelectorAll(modalClose);

/* Portfolio */
const filterLink = document.querySelectorAll(dataFilter);
const portfolioItems = document.querySelectorAll(portfolioData);
const searchBox = document.querySelector("#search");

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !== null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  }
  elm.classList.add(active);
};

// Toggle Theme
const root = document.documentElement;

const setTheme = (val) => {
  if (val === dark) {
    root.setAttribute(dataTheme, dark);
    localStorage.setItem(theme, dark);
  } else {
    root.setAttribute(dataTheme, light);
    localStorage.setItem(theme, light);
  }
};

if (currentTheme) {
  root.setAttribute(dataTheme, currentTheme);
  switcher.forEach((btn) => {
    btn.classList.remove(active);
  });
  if (currentTheme === "dark") {
    switcher[1].classList.add(active);
  } else {
    switcher[0].classList.add(active);
  }
}

toggleTheme.addEventListener("click", function () {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function () {
    const toggle = this.dataset.toggle;
    // set active state
    setActive(elm, switcherBtn);
    setTheme(toggle);
  });
}

// Filter NavBar in Portfolio Section
for (const link of filterLink) {
  link.addEventListener("click", function () {
    setActive(link, ".filter-link");
    const filter = this.dataset.filter;
    portfolioItems.forEach((card) => {
      if (filter === "all") {
        card.style.display = "block";
      } else if (card.dataset.item === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Search Bar in Portfolio Section
searchBox.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase().trim();
  portfolioItems.forEach((card) => {
    if (card.dataset.item.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Modal/Full Site Modal "close buttons"
// [data-close] attribute will go to the parent elements three times to remove 'is-visible' class
for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    // handles Full Site Modals' close buttons
    const topModalElement = this.parentElement.parentElement.parentElement;
    topModalElement.classList.remove(isVisible);
  });
}

const modalElementTarget = document.querySelector(".modal");
// Modal
// click outside of opened modal will close the modal
document.addEventListener("click", (e) => {
  const modalElementTarget = document.querySelector(".modal");
  if (e.target === document.querySelector(".modal.is-visible")) {
    modalElementTarget.classList.remove(isVisible);
  }
});

// pressing 'ESCAPE' key while modal is open will close the modal
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    modalElementTarget.classList.remove(isVisible);
  }
});

// Modal/Full Site Modal "open buttons"
// adds the class 'is-visible' to the [data-open] attribute
for (const elm of openModal) {
  elm.addEventListener("click", function () {
    for (const e of modalArray) {
      if (e.getAttribute("data-open") === elm.getAttribute("data-open")) {
        modalContainerId
          .querySelector(".modal")
          .setAttribute("id", e.getAttribute("data-open"));

        modalContainerId.querySelector("h3").innerHTML =
          e.querySelector(".card-popup-box").querySelector("div").textContent +
          " " +
          e.getAttribute("data-open").replace(/^\D+/g, "");

        modalContainerId
          .querySelector("img")
          .setAttribute("src", e.querySelector("img").getAttribute("src"));
      }
    }
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

// handles Modal's close buttons
for (const elm of closeModal) {
  elm.addEventListener("click", function () {
    if (modalContainerId.getElementById.hasChildNodes()) {
      setTimeout(() => {
        this.children[0].classList.remove(isVisible);
        setTimeout(() => {
          this.children[0].remove();
        }, 500);
      });
    }
  });
}

// get elements displayed in marquee
// nodelist.length
// assign --marquee-elms nodelist.length

const elmsDisplayed = getComputedStyle(root).getPropertyValue(
  "--marquee-elms-displayed"
);
const marqueeContent = document.querySelector("ul.marquee-content");

root.style.setProperty("--marquee-elms", marqueeContent.children.length);

for (let i = 0; i < elmsDisplayed; i++) {
  marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
}
