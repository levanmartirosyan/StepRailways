window.onscroll = function () {
  let navbar = document.querySelector("nav");
  if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
    navbar.classList.add("navScrolled");
  } else {
    navbar.classList.remove("navScrolled");
  }
};
