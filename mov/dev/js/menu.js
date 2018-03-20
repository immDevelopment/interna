let iconMenu = document.getElementById('icon-menu');
let menu = document.getElementById('main-menu');
let darkMenu = document.getElementById('darkMenu');

iconMenu.addEventListener('click', ()=>{
    menu.classList.toggle('main-menu--show');
    darkMenu.classList.toggle('darkMenu--hide');
});

darkMenu.addEventListener('click',()=>{
    menu.classList.toggle('main-menu--show');
    darkMenu.classList.toggle('darkMenu--hide');
});
