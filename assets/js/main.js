document.addEventListener("DOMContentLoaded", (event) => {
    fadeOut(document.getElementById("preloader"));
    progressBars();
    navShadowStyle();
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && window.matchMedia("(prefers-color-scheme)").media !== "not all") {
        switchMode(globalMode);
    }
    window.matchMedia("(prefers-color-scheme: dark)").onchange = function () {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && window.matchMedia("(prefers-color-scheme)").media !== "not all") {
            globalMode = "day-mode";
        } else {
            globalMode = "night-mode";
        }
        switchMode(globalMode);
    };
    let modeButtons = document.querySelectorAll("button.mode-toggle");
    modeButtons.forEach(function(element) {
        element.addEventListener("click", () => {
            switchMode(globalMode);
        });
    });
});

var globalMode = "day-mode";

function switchMode(mode) {
    let root = document.querySelector(":root");
    let coffeeBanners = document.querySelectorAll(".coffee-banner");
    if(mode === "day-mode") {
        root.style.setProperty("--primary-color", "#eeeeee");
        root.style.setProperty("--secondary-color", "#2a2a2a");
        document.getElementById("day-mode").classList.remove("hidden");
        document.getElementById("night-mode").classList.add("hidden");
        coffeeBanners.forEach(function(element) {
            element.classList.add("darken-image");
        });
        globalMode = "night-mode";
    } else {
        root.style.setProperty("--primary-color", "#2a2a2a");
        root.style.setProperty("--secondary-color", "#eeeeee");
        document.getElementById("day-mode").classList.add("hidden");
        document.getElementById("night-mode").classList.remove("hidden");
        coffeeBanners.forEach(function (element) {
            element.classList.remove("darken-image");
        });
        globalMode = "day-mode";
    }
}

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

function navShadowStyle() {
    let nav = document.querySelector("nav");
    let backToTop = document.getElementById("backToTop");
    let section = document.getElementById("top");
    let observer = new IntersectionObserver(function (entry) {
        if (entry[0].isIntersecting) {
            nav.classList.add("nav-solid");
            nav.classList.remove("nav-shadow");
            backToTop.classList.add("backToTop-hidden");
        } else {
            nav.classList.add("nav-shadow");
            backToTop.classList.remove("backToTop-hidden");
            nav.classList.remove("nav-solid");
        }
    });
    observer.observe(section);
};

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
    });
    observer.observe(section);
};