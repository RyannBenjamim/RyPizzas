const menubtn = document.querySelector('.menu-btn')
const navul = document.querySelector('header nav ul')
const menubtnIcon = document.querySelector('.menu-btn i')

menubtn.addEventListener('click', () => {
    if (menubtnIcon.getAttribute('class') == 'fa-solid fa-bars') {
        navul.classList.add('show')
        menubtnIcon.style.size = '40px'
        menubtnIcon.setAttribute('class', 'fa-solid fa-circle-xmark')
    } else {
        navul.classList.remove('show')
        menubtnIcon.setAttribute('class', 'fa-solid fa-bars')
    }
})