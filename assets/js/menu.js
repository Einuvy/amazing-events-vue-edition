const header = document.querySelector('.top-header-container');

window.addEventListener('scroll', function() {
    header.classList.toggle('permanent', window.scrollY>50)
})