const apiKey = "e2298c271286ffc9df656ab22407b0d4";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");
const cityText = document.querySelector(".weather-card h2");
const dateText = document.querySelector(".weather-card p");
const tempText = document.querySelector(".temp");
const descText = document.querySelector(".description");
const weatherIcon = document.querySelector(".weather-icon");
const humidityText = document.querySelector(".humidity");
const windText = document.querySelector(".wind");
const pressureText = document.querySelector(".pressure");
const loginForm = document.querySelector("#login-form");
const signupForm = document.querySelector("#signup-form");
const linkToSignup = document.querySelector("#show-signup");
const linkToLogin = document.querySelector("#show-login");
const backToTopButton = document.getElementById("back-to-top");

const loginButton = document.querySelector("#login-button");
const signupButton = document.querySelector("#signup-button");
const signupEmail = document.querySelector("#signup-form input[type='email']");
const signupPassword = document.querySelector("#signup-form input[type='password']");

const hamburger = document.querySelector("#hamburger-menu");
const navMenu = document.querySelector(".nav-menu");


function updateSearchHistory(city) {
    let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

    history = history.filter(item => item.toLowerCase() !== city.toLowerCase());
    history.unshift(city);

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem('searchHistory', JSON.stringify(history));
}



async function checkWeather(cityName) {
    if (cityName == "") {
        alert("Please enter a city name!");
        return;
    }

    try {
        const response = await fetch(apiUrl + cityName + `&appid=${apiKey}`);

        if (response.status == 404) {
            alert("City not found. Please check spelling.");
            return;
        }

        const data = await response.json();
        
        updateSearchHistory(data.name); 

        cityText.innerHTML = data.name + ", " + data.sys.country;
        tempText.innerHTML = Math.round(data.main.temp) + "°C";
        descText.innerHTML = data.weather[0].description;
        humidityText.innerHTML = data.main.humidity + "%";
        windText.innerHTML = data.wind.speed + " km/h";
        pressureText.innerHTML = data.main.pressure + " hPa";

        const iconCode = data.weather[0].icon; 
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        const today = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateText.innerHTML = today.toLocaleDateString("en-US", options);

    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Check your internet connection.");
    }
}


function searchClick() {
    checkWeather(searchInput.value);
}
searchButton.addEventListener("click", searchClick);


function searchKeypress(event) {
    if (event.key === "Enter") {
        checkWeather(searchInput.value);
    }
}
searchInput.addEventListener("keypress", searchKeypress);


function showSignup(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    loginForm.style.display = "none";
    signupForm.style.display = "block";
}

if (linkToSignup) {
    linkToSignup.addEventListener("click", showSignup);
}

function showLogin(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
    }
    signupForm.style.display = "none";
    loginForm.style.display = "block";
}

if (linkToLogin) {
    linkToLogin.addEventListener("click", showLogin);
}


function signupSubmit() {
    const emailValue = signupEmail.value;
    const passwordValue = signupPassword.value;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValue || !passwordValue) {
        alert("Please fill in both email and password.");
        return;
    }

    if (!emailRegex.test(emailValue)) {
        alert("Please enter a valid email format (e.g., user@domain.com).");
        return;
    }
    
    const userData = {
        email: emailValue,
        password: passwordValue
    };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    alert("Signup successful! You can now log in.");

    showLogin({}); 
}

if (signupButton) {
    signupButton.addEventListener("click", signupSubmit);
}

function loginSubmit() {
    alert("Login logic triggered! (Needs implementation to check credentials.)");
}

if (loginButton) {
    loginButton.addEventListener("click", loginSubmit);
}


function toggleHamburgerMenu() {
    navMenu.classList.toggle('active');
}

if (hamburger) {
    hamburger.addEventListener("click", toggleHamburgerMenu);
}


function backToTopClick() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

if (backToTopButton) {
    backToTopButton.addEventListener("click", backToTopClick);
}

function scrollVisibility() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if (backToTopButton) {
            backToTopButton.style.display = "block";
        }
    } else {
        if (backToTopButton) {
            backToTopButton.style.display = "none";
        }
    }
}

window.addEventListener("scroll", scrollVisibility);