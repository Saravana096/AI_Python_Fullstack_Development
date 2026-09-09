/* =====================================================
   TASTYBITES - JAVASCRIPT
===================================================== */


/* =====================================================
   1. PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function (page) {
        page.classList.remove("active-page");
    });

    const selectedPage =
        document.getElementById(pageName + "Page");

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================================
   2. ACCOUNT
===================================================== */

function openAccount() {

    const loggedIn =
        localStorage.getItem("tastyBitesLoggedIn");

    if (loggedIn === "true") {

        const userName =
            localStorage.getItem("tastyBitesUserName") ||
            "Food Lover";

        alert(`Welcome ${userName}! You are already logged in.`);

    } else {

        openLogin();
    }
}


/* =====================================================
   3. LOGIN MODAL
===================================================== */

function openLogin() {

    closeAllModals();

    document
        .getElementById("loginModal")
        .classList.add("show");
}


/* =====================================================
   4. CLOSE MODAL
===================================================== */

function closeModal(modalId) {

    document
        .getElementById(modalId)
        .classList.remove("show");
}


function closeAllModals() {

    document
        .querySelectorAll(".modal")
        .forEach(function (modal) {

            modal.classList.remove("show");

        });
}


/* =====================================================
   5. REGISTER MODAL
===================================================== */

function openRegister() {

    closeAllModals();

    document
        .getElementById("registerModal")
        .classList.add("show");
}


/* =====================================================
   6. REGISTER FORM
===================================================== */

document
    .getElementById("registerForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document
                .getElementById("registerName")
                .value
                .trim();

        const email =
            document
                .getElementById("registerEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("registerPassword")
                .value;


        /* Check empty fields */

        if (
            name === "" ||
            email === "" ||
            password === ""
        ) {

            alert("Please fill all fields.");

            return;
        }


        /* Check password */

        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;
        }


        /* Save user information */

        localStorage.setItem(
            "tastyBitesUserName",
            name
        );

        localStorage.setItem(
            "tastyBitesUserEmail",
            email
        );

        localStorage.setItem(
            "tastyBitesLoggedIn",
            "true"
        );


        alert(
            "Account created successfully!"
        );


        /* Clear form */

        this.reset();


        /* Close popup */

        closeAllModals();


        /* Open Write Blog page */

        showPage("write");

    });


/* =====================================================
   7. LOGIN FORM
===================================================== */

document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();

        const password =
            document
                .getElementById("loginPassword")
                .value;


        /* Check empty fields */

        if (
            email === "" ||
            password === ""
        ) {

            alert(
                "Please enter email and password."
            );

            return;
        }


        /* Demo login */

        localStorage.setItem(
            "tastyBitesLoggedIn",
            "true"
        );

        localStorage.setItem(
            "tastyBitesUserEmail",
            email
        );

        localStorage.setItem(
            "tastyBitesUserName",
            email.split("@")[0]
        );


        alert(
            "Login successful!"
        );


        this.reset();

        closeAllModals();

        showPage("write");

    });


/* =====================================================
   8. WRITE BLOG
===================================================== */

function openWriteBlog() {

    const loggedIn =
        localStorage.getItem("tastyBitesLoggedIn");


    /*
       User is NOT logged in
    */

    if (loggedIn !== "true") {

        alert(
            "Please Login or Register before writing a blog."
        );

        openLogin();

        return;
    }


    /*
       User is logged in
    */

    showPage("write");

}


/* =====================================================
   9. PASSWORD SHOW / HIDE
===================================================== */

function togglePassword() {

    const password =
        document.getElementById("loginPassword");


    if (password.type === "password") {

        password.type = "text";

    } else {

        password.type = "password";

    }

}


/* =====================================================
   10. FORGOT PASSWORD
===================================================== */

function forgotPassword() {

    alert(
        "Password reset link will be sent to your registered email."
    );

}


/* =====================================================
   11. SUBSCRIBE MODAL
===================================================== */

function openSubscribe() {

    closeAllModals();

    document
        .getElementById("subscribeModal")
        .classList.add("show");

}


/* =====================================================
   12. SUBSCRIBE FORM
===================================================== */

document
    .getElementById("subscribeForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById("subscribeEmail")
                .value
                .trim();


        if (
            email === "" ||
            !email.includes("@")
        ) {

            alert(
                "Please enter a valid email address."
            );

            return;
        }


        alert(
            "Successfully subscribed to TastyBites!"
        );


        this.reset();

        closeAllModals();

    });


/* =====================================================
   13. BLOG CATEGORY FILTER
===================================================== */

function filterBlogs(category, button) {

    const blogs =
        document.querySelectorAll(".blog-item");


    const buttons =
        document.querySelectorAll(".category-btn");


    /* Remove active class */

    buttons.forEach(function (btn) {

        btn.classList.remove("active");

    });


    /* Add active class */

    button.classList.add("active");


    /* Filter blogs */

    blogs.forEach(function (blog) {

        const blogCategory =
            blog.getAttribute("data-category");


        if (
            category === "all" ||
            blogCategory === category
        ) {

            blog.style.display = "flex";

        } else {

            blog.style.display = "none";

        }

    });

}


/* =====================================================
   14. SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "keyup",
    function () {

        const searchValue =
            this.value
                .toLowerCase()
                .trim();


        const blogs =
            document.querySelectorAll(".blog-item");


        /*
           If user starts searching,
           automatically show Blogs page.
        */

        if (searchValue !== "") {

            showPage("blogs");

        }


        blogs.forEach(function (blog) {

            const blogText =
                blog.innerText.toLowerCase();


            if (
                blogText.includes(searchValue)
            ) {

                blog.style.display = "flex";

            } else {

                blog.style.display = "none";

            }

        });

    }
);


/* =====================================================
   15. READ BLOG
===================================================== */

function readBlog(title) {

    showPage("blogs");

    setTimeout(function () {

        alert(
            `Opening blog: ${title}`
        );

    }, 300);

}


/* =====================================================
   16. RECIPE DETAILS
===================================================== */

function openRecipe(recipeName) {

    const title =
        document.getElementById(
            "recipeModalTitle"
        );


    const content =
        document.getElementById(
            "recipeModalContent"
        );


    title.innerText = recipeName;


    content.innerHTML = `

        <p>
            <strong>Ingredients</strong>
        </p>

        <p>
            Fresh ingredients, vegetables,
            herbs and seasoning.
        </p>

        <br>

        <p>
            <strong>Preparation</strong>
        </p>

        <p>
            Prepare the ingredients, cook them
            according to the recipe and serve hot.
        </p>

        <br>

        <p>
            ⭐ Rating: 4.5 / 5
        </p>

    `;


    document
        .getElementById("recipeModal")
        .classList.add("show");

}


/* =====================================================
   17. WRITE BLOG FORM
===================================================== */

document
    .getElementById("blogForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const title =
            document
                .getElementById("blogTitle")
                .value
                .trim();


        const category =
            document
                .getElementById("blogCategory")
                .value;


        const content =
            document
                .getElementById("blogContent")
                .value
                .trim();


        if (
            title === "" ||
            content === ""
        ) {

            alert(
                "Please enter blog title and content."
            );

            return;
        }


        alert(
            `Blog "${title}" published successfully!`
        );


        console.log("Blog Title:", title);

        console.log("Category:", category);

        console.log("Blog Content:", content);


        this.reset();


        showPage("blogs");

    });


/* =====================================================
   18. MOBILE MENU
===================================================== */

function toggleMobileMenu() {

    const navbar =
        document.querySelector(".navbar");


    if (
        navbar.style.display === "flex"
    ) {

        navbar.style.display = "none";

    } else {

        navbar.style.display = "flex";

        navbar.style.position = "absolute";

        navbar.style.top = "90px";

        navbar.style.left = "0";

        navbar.style.width = "100%";

        navbar.style.background = "white";

        navbar.style.flexDirection = "column";

        navbar.style.padding = "20px";

    }

}


/* =====================================================
   19. CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

document
    .querySelectorAll(".modal")
    .forEach(function (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove("show");

                }

            }
        );

    });


/* =====================================================
   20. ESC KEY - CLOSE MODAL
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeAllModals();

        }

    }
);