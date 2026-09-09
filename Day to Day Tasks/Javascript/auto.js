const searchInput =
    document.getElementById("searchInput");

const results =
    document.getElementById("results");

const loadingMessage =
    document.getElementById("loadingMessage");

const errorMessage =
    document.getElementById("errorMessage");


const API_URL =
    "https://jsonplaceholder.typicode.com/users";


// Input event
searchInput.addEventListener(
    "input",
    debounce(searchUsers, 500)
);


// Debounce function
function debounce(functionToCall, delay) {

    let timer;

    return function () {

        clearTimeout(timer);

        timer = setTimeout(
            functionToCall,
            delay
        );

    };

}


// Search users
async function searchUsers() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    results.innerHTML = "";

    errorMessage.textContent = "";


    if (searchValue === "") {

        loadingMessage.textContent = "";

        return;

    }


    loadingMessage.textContent =
        "Searching...";


    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Failed to fetch users."
            );

        }


        const users =
            await response.json();


        const filteredUsers =
            users.filter(function (user) {

                return user.name
                    .toLowerCase()
                    .includes(searchValue);

            });


        displayResults(filteredUsers);


    } catch (error) {

        errorMessage.textContent =
            "Unable to search users. Please try again.";

    } finally {

        loadingMessage.textContent = "";

    }

}


// Display search results
function displayResults(users) {

    results.innerHTML = "";


    if (users.length === 0) {

        results.textContent =
            "No users found.";

        return;

    }


    users.forEach(function (user) {

        const resultItem =
            document.createElement("div");

        resultItem.classList.add(
            "result-item"
        );


        const userName =
            document.createElement("h3");

        userName.textContent =
            user.name;


        const userEmail =
            document.createElement("p");

        userEmail.textContent =
            user.email;


        resultItem.appendChild(
            userName
        );

        resultItem.appendChild(
            userEmail
        );


        results.appendChild(
            resultItem
        );

    });

}