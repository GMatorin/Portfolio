const navItems = document.querySelectorAll('.menu-ul_item');
const navMenu = document.getElementById('menu');
const sections = document.querySelectorAll('.pageSection');
/* Flag for currently highlited section in the nav menu */
let currentNavItem = navItems[0];
/* Add scroll event listener to handle activities in the nav menu. The navHandle function is wrapped in debounce function to not be called to often, which could cause performance issues. */

window.addEventListener('scroll', debounce(navHandle, 10));
/* Debaunce funcion makes our navHandle function to be called only every so often and not every time we scroll. Here 10/1000 s */
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function navHandle(e) {
  /* 1. Change appearance of the nav menu according to its position */
  /* If the screem view is at the top of the page make navMenu appear without background */
  /* index variable to find the active section of the web page */
  let index = sections.length;

  if (window.scrollY === 0) {
    navMenu.classList.remove('nav-remove');
  } else if (window.scrollY >= 100) {
    /* Remove nav menu if on home page in the text area  */
    navMenu.classList.add('nav-remove');
  }
  /* Make nav menu apear with black background if under home section */

  if (window.scrollY >= sections[1].offsetTop) {
    navMenu.classList.add('nav-background-main');
    navMenu.classList.remove('nav-remove');
  } else if (window.scrollY <= 754) {
    /* Remove background otherwise */
    navMenu.classList.remove('nav-background-main');
  }

  /* 2. Change the current state in the nav menu for active section on the screen */
  /* Count down the index variable till the active section is found */
  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  /* Remove current class from last nav link */
  currentNavItem.classList.remove('current');
  currentNavItem = navItems[index];
  /* Add current class to nav link which represents the active section of the webpage */
  currentNavItem.classList.add('current');
}
