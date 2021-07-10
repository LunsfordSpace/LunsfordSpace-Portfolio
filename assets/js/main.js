document.addEventListener("DOMContentLoaded", (event) => {
    fadeOut(document.getElementById("preloader"));
    progressBars();
});

function fadeOut(element) {
    let opacity = 1;
    let timer = setInterval(function () {
        if (opacity <= 0.2) {
            clearInterval(timer);
            document.getElementById("preloader").style.display = "none";
        }
        element.style.opacity = opacity;
        opacity -= 0.2;
    }, 50);
}

function progressBars() {
    let section = document.getElementById("progress-items");
    let bars = document.querySelectorAll("div.progress-bar");
    let observer = new IntersectionObserver(function(entry) {
        if (entry[0].isIntersecting) {
            bars.forEach(function (element) {
                let progress = element.getAttribute("progress");
                let index = 0;
                let timer = setInterval(function () {
                    if (index === progress - 5) {
                        clearInterval(timer);
                    }
                    element.style.width = `${index}%`;
                    index += 5;
                }, 50);
            });
            observer.unobserve(section);
        }
    }, {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0
    });
    observer.observe(section);
};