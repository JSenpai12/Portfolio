// ------------------------------
// 1. Mobile navigation
// ------------------------------
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
  // Toggle the "open" class to show or hide the menu.
  mainNav.classList.toggle("open");

  // Keep the accessibility label in sync with the menu.
  const menuIsOpen = mainNav.classList.contains("open");
  menuButton.setAttribute("aria-expanded", menuIsOpen);
});

// Close the mobile menu after clicking one of its links.
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// ------------------------------
// 2. Interactive project carousel
// ------------------------------
const projectTrack = document.getElementById("projectTrack");
const projectCards = document.querySelectorAll(".project-card");
const previousButton = document.getElementById("prevProject");
const nextButton = document.getElementById("nextProject");

let currentProject = 0;

function getVisibleProjects() {
  // Show one card on a small screen, two on medium, and three on wide screens.
  if (window.innerWidth <= 620) return 1;
  if (window.innerWidth <= 850) return 2;
  return 3;
}

function updateCarousel() {
  const visibleProjects = getVisibleProjects();
  const lastStartingIndex = Math.max(0, projectCards.length - visibleProjects);

  // Keep the index inside the available range after a resize.
  currentProject = Math.min(currentProject, lastStartingIndex);

  const cardWidth = projectCards[0].getBoundingClientRect().width;
  const trackGap = 22;
  const distance = currentProject * (cardWidth + trackGap);

  projectTrack.style.transform = `translateX(-${distance}px)`;

  // Disable arrows when the user reaches either end.
  previousButton.disabled = currentProject === 0;
  nextButton.disabled = currentProject === lastStartingIndex;
}

nextButton.addEventListener("click", () => {
  currentProject += 1;
  updateCarousel();
});

previousButton.addEventListener("click", () => {
  currentProject -= 1;
  updateCarousel();
});

window.addEventListener("resize", updateCarousel);
updateCarousel();

// ------------------------------
// 3. Create the GitHub-style
//    contribution activity grid
// ------------------------------
const contributionGrid = document.getElementById("contributionGrid");
const numberOfCells = 52 * 7; // 52 weeks, 7 days per week

for (let cellNumber = 0; cellNumber < numberOfCells; cellNumber += 1) {
  const cell = document.createElement("span");
  const activityLevel = Math.floor(Math.random() * 5);

  cell.classList.add("contribution-cell");

  if (activityLevel > 0) {
    cell.classList.add(`level-${activityLevel}`);
  }

  contributionGrid.appendChild(cell);
}

// ------------------------------
// 4. Interactive hero carousel
// ------------------------------

const heroSlides = document.querySelectorAll(".hero-slide");
const heroIndicators = document.querySelectorAll(".hero-indicator");

const prevHeroButton = document.getElementById("prevHero");
const nextHeroButton = document.getElementById("nextHero");

const heroSlideNumber = document.querySelector(".hero-slide-number");

let currentSlide = 0;

// Display a specific slide
function showHeroSlide(index) {
  // Remove active from every slide and indicator
  heroSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  heroIndicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  // Update the current slide index
  currentSlide = index;

  // Activate the selected slide and indicator
  heroSlides[currentSlide].classList.add("active");
  heroIndicators[currentSlide].classList.add("active");

  // Update the slide counter
  heroSlideNumber.textContent =
    `0${currentSlide + 1} / 0${heroSlides.length}`;
}

// Next slide button
nextHeroButton.addEventListener("click", () => {
  const nextSlide = (currentSlide + 1) % heroSlides.length;
  showHeroSlide(nextSlide);
});

// Previous slide button
prevHeroButton.addEventListener("click", () => {
  const previousSlide =
    (currentSlide - 1 + heroSlides.length) % heroSlides.length;

  showHeroSlide(previousSlide);
});

// Indicator buttons
heroIndicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    const slideIndex = Number(indicator.dataset.slide);
    showHeroSlide(slideIndex);
  });
});
