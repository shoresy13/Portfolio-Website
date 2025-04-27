const navLinks = document.querySelectorAll(".navbar-links a");
const sections = document.querySelectorAll("section");

const disableScroll = () => {
  document.body.style.overflow = "hidden";
};

const enableScroll = () => {
  document.body.style.overflow = "";
};

document.addEventListener("DOMContentLoaded", () => {
  const aboutLink = document.querySelector('a[href="#about"]');
  aboutLink.classList.add("active");

  const targetSection = document.querySelector("#about");
  targetSection.scrollIntoView({ behavior: "smooth" });

  history.replaceState(null, "", "#about");
});

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    navLinks.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");

    const targetSection = document.querySelector(this.getAttribute("href"));
    targetSection.scrollIntoView({ behavior: "smooth" });

    history.pushState(null, "", this.getAttribute("href"));
  });
});
