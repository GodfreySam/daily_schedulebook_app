// Select DOM Items
const closeBtn = document.querySelector('.fa-plus');
const penBtn = document.querySelector('.pen-btn');
const menu = document.querySelector('.menu');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.nav-item');

// Set Initial State of Menu
let showMenu = false;

const toggleMenu = () => {
  if (!showMenu) {
    // closeBtn.classList.remove('show');
    penBtn.classList.add('close');
    menu.classList.add('show');
    menuNav.classList.add('show');
    navItems.forEach(item => item.classList.add('show'));

    // Set Menu State
    showMenu = true;
  } else {
    // closeBtn.classList.add('close');
    penBtn.classList.remove('close');
    menu.classList.remove('show');
    menuNav.classList.remove('show');
    navItems.forEach(item => item.classList.remove('show'));

    // Set Menu State
    showMenu = false;
  }
}

closeBtn.addEventListener('click', toggleMenu);
penBtn.addEventListener('click', toggleMenu);