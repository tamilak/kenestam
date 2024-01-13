document.addEventListener("DOMContentLoaded", function () {
    var angleIcon = document.querySelector(".angle");
    var targetElement = document.querySelector(".downnavbar");

    angleIcon.addEventListener("click", function () {
        targetElement.scrollIntoView({ behavior: "smooth" });
    });
});