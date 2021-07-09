document.addEventListener("DOMContentLoaded", (event) => {
    fadeOut(document.getElementById("preloader"));
});

function fadeOut(element) {
    let opacity = 1;
    let timer = setInterval(function () {
        if (opacity <= 0.2) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity -= 0.2;
    }, 50);
}