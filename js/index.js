const inputs = document.querySelectorAll("input");
const formData = document.querySelector('form');
const btnLogin = document.getElementById("btnLogin");

let isValid = false;
let userInfo = [];


// change themee dark or light mode 

const mode = document.getElementById("mode");

if(localStorage.getItem("theme") != null){

    const themeData = localStorage.getItem("theme");
 
    if(themeData === "light"){
 
        mode.classList.replace("fa-sun" , "fa-moon");
 
    }else{
        mode.classList.replace("fa-moon" , "fa-sun");
       
    }
 
    document.querySelector("html").setAttribute("data-theme" , themeData);
 
 }
 
mode.addEventListener("click" , function(e){

    if(mode.classList.contains("fa-sun")){
 
       document.querySelector("html").setAttribute("data-theme" , "light");
 
       mode.classList.replace("fa-sun" , "fa-moon");
 
       localStorage.setItem("theme" , "light");
 
    }else{
       document.querySelector("html").setAttribute("data-theme" , "dark");
       mode.classList.replace("fa-moon" , "fa-sun");
 
       localStorage.setItem("theme" , "dark");
    }

  
});

// Load user data from localStorage
if (localStorage.getItem("users") !== null) {
    userInfo = JSON.parse(localStorage.getItem("users"));
}

let username = localStorage.getItem("sessionUserName");

function login() {
    let logInEmail = document.getElementById("email");
    let logInPass = document.getElementById("password");
    let checkInput = document.getElementById("checkInput");
    let fillMsg = document.getElementById("fillMsg");

    // Reset error messages
    fillMsg.classList.add("d-none");
    checkInput.classList.add("d-none");

    // Check if inputs are empty
    if (logInEmail.value === "" || logInPass.value === "") {
        fillMsg.classList.replace("d-none", "d-block");
        return false;
    }

    // Check if the email and password match a user in localStorage
    let foundUser = false;
    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].email.toLowerCase() === logInEmail.value.toLowerCase() &&
            userInfo[i].password === logInPass.value) {  
            localStorage.setItem("sessionUserEmail", userInfo[i].email);  
            foundUser = true;
            break;
        }
    }

    // If user is found, redirect to home.html
    if (foundUser) {
        isValid = true;
        window.location.href = "./home.html";  
    } else {
        checkInput.classList.replace("d-none", "d-block");
    }
}

formData.addEventListener("submit", function(e) {
    e.preventDefault();
    login();
});
