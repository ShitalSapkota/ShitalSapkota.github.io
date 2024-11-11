'use strict'

const navbar = document.querySelector('nav ul');
const menu_lists = document.querySelectorAll('nav ul li');
const backTop = document.querySelector('#backTop');

// For Mobile menu
function toggleMenu(){  
    navbar.classList.toggle('active');

};

menu_lists.forEach(item => {
    item.addEventListener('click', function() {
        navbar.classList.remove('active');
    });
});

// for back to top

backTop.addEventListener('click',()=>{
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});