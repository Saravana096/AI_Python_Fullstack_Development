const themeButton = document.getElementById("themeButton");


// Check saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-theme");

    themeButton.innerText = "☀️ Light Mode";

} else {

    document.body.classList.add("light-theme");

    themeButton.innerText = "🌙 Dark Mode";
}


// Toggle Theme
themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");


    if (document.body.classList.contains("dark-theme")) {

        localStorage.setItem("theme", "dark");

        themeButton.innerText = "☀️ Light Mode";

    } else {

        localStorage.setItem("theme", "light");

        themeButton.innerText = "🌙 Dark Mode";

    }

});