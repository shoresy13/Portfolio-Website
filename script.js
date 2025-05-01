const navLinks = document.querySelectorAll(".navbar-links a");
const sections = document.querySelectorAll("section");

let observer;
let scrollTimeout;

// Function to start observing sections
function startObserving() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });

        history.replaceState(null, "", `#${id}`);
      }
    });
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.6,
  });

  sections.forEach((section) => observer.observe(section));
}

// Start observing initially
startObserving();

// Helper: Wait for scroll to stop
function waitForScrollEnd(callback) {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(callback, 150);
}

// Click handler with instant feedback
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Instantly apply active class for visual feedback
    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");

    const targetSection = document.querySelector(this.getAttribute("href"));
    targetSection.scrollIntoView({ behavior: "smooth" });

    // Pause observer during scroll
    if (observer) observer.disconnect();

    // Wait for scroll to stop before re-enabling
    const onScroll = () => {
      waitForScrollEnd(() => {
        window.removeEventListener("scroll", onScroll);
        startObserving(); // Resume observer
      });
    };

    window.addEventListener("scroll", onScroll);
  });
});
