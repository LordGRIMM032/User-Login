const menu = document.querySelector('.menu');
const menu_close = document.querySelector('.menu_close');
const dashboard = document.querySelector('.dashboard');
const dash_wrap = document.querySelector('.dash-wrap');


menu_close.addEventListener('click', ()=>{
    menu.classList.toggle('close');
    dashboard.classList.toggle('fullscreen');
    dash_wrap.classList.toggle('fullscreen');

})
