const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".side-nav a");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive =
            link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", isActive);

          if (isActive) {
            moveIndicator(link);
          }
        });
      }
    });
  },
  {
    threshold: 0.6
  }
);

sections.forEach(section => observer.observe(section));

const toggle = document.getElementById("theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("theme");

if (storedTheme) {
  document.body.classList.toggle("dark", storedTheme === "dark");
} else if (prefersDark) {
  document.body.classList.add("dark");
}

toggle.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";

toggle.addEventListener("click", () => {

  toggle.style.opacity = 0;


  setTimeout(() => {

    document.body.classList.toggle("dark");


    toggle.textContent = document.body.classList.contains("dark") ? "Light" : "Dark";


    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );


    toggle.style.opacity = 1;
  }, 300);
});


const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll("main section").forEach(section => {
  revealObserver.observe(section);
});

document.querySelectorAll("main section").forEach((section, i) => {
  section.style.transitionDelay = `${i * 60}ms`;
  revealObserver.observe(section);
});

const indicator = document.querySelector(".nav-indicator");
const nav = document.querySelector(".side-nav");

function moveIndicator(activeLink) {
  const li = activeLink.closest("li");
  const liRect = li.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();

  const centerY =
    liRect.top - navRect.top + liRect.height / 2;

  indicator.style.transform = `translateY(${centerY - indicator.offsetHeight / 2}px)`;
}

document.querySelectorAll(".project-header").forEach(header => {
  header.addEventListener("click", () => {
    const card = header.closest(".project-card");
    card.classList.toggle("open");
  });
});
