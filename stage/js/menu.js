// Select DOM Items
const menuBtn = document.querySelector('.menu-btn');
const penBtn = document.querySelector('.pen-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State of Menu
let showMenu = false;

const toggleMenu = () => {
  if (!showMenu) {
    menuBtn.classList.add('close');
    penBtn.classList.add('pen-hide');
    menu.classList.add('show');
    menuNav.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    // Set Menu State
    showMenu = true;
  } else {
    // menuBtn.classList.remove('close');
    penBtn.classList.remove('pen-hide');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Set Menu State
    showMenu = false;
  }
}

menuBtn.addEventListener('click', toggleMenu);
penBtn.addEventListener('click', toggleMenu);