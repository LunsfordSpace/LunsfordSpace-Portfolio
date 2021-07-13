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
    let contactForm = document.getElementById("contact-form");
    contactForm.addEventListener("submit", getFormSubmit);
});

var globalMode = "day-mode";

function switchMode(mode) {
    let root = document.querySelector(":root");
    let coffeeBanners = document.querySelectorAll(".coffee-banner");
    if(mode === "day-mode") {
        root.style.setProperty("--primary-color", "#eeeeee");
        root.style.setProperty("--secondary-color", "#2a2a2a");
        root.style.setProperty("--secondary-contrast-color", "#2f2f2f");
        document.getElementById("day-mode").classList.remove("hidden");
        document.getElementById("night-mode").classList.add("hidden");
        coffeeBanners.forEach(function(element) {
            element.classList.remove("lighten-image");
            element.classList.add("darken-image");
        });
        globalMode = "night-mode";
    } else {
        root.style.setProperty("--primary-color", "#2a2a2a");
        root.style.setProperty("--secondary-color", "#eeeeee");
        root.style.setProperty("--secondary-contrast-color", "#f3f3f3");
        document.getElementById("day-mode").classList.add("hidden");
        document.getElementById("night-mode").classList.remove("hidden");
        coffeeBanners.forEach(function (element) {
            element.classList.remove("darken-image");
            element.classList.add("lighten-image");
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

function getFormSubmit(event) {
    event.preventDefault();
    if (document.querySelector('input[name="contactPhone"]').checked === true) {
        return;
    }
    let form = document.getElementById("contact-form");
    let errorDiv = document.getElementById("contact-error");
    errorDiv.innerHTML = "";
    let successDiv = document.getElementById("contact-success");
    successDiv.innerHTML = "";
    let name = document.querySelector('input[name="contactName"]').value;
    let email = document.querySelector('input[name="contactEmail"]').value;
    let subject = document.querySelector('input[name="contactSubject"]').value;
    let message = document.querySelector('textarea[name="contactMessage"]').value;
    let emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (name === "") {
        errorDiv.innerHTML = `Please enter your name.<br>`;
        return;
    }
    if (email === "" || !email.match(emailRegex)) {
        errorDiv.innerHTML = `Please enter a valid email.<br>`;
        return;
    }
    if (subject === "") {
        errorDiv.innerHTML = `Please enter a subject line.`;
        return;
    }
    if (message === "") {
        errorDiv.innerHTML = `Please enter your message.`;
        return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    fetch("https://getform.io/f/f92aafa1-68d9-4ebd-9c15-c7aed6b4c120", {
        method: "POST",
        body: formData,
    })
    .then(() => {
        successDiv.innerHTML = `<h4>Thank you for reaching out!</h4>
<h6>I'll respond as soon as I'm able.</h6>`;
        successDiv.classList.remove("hidden");
        form.classList.add("hidden");
    })
    .catch((error) => {
        error => console.error(error.message);
        errorDiv.innerHTML = `There was an error with your submission: ${error.message}`;
    });
}