// global
const inputs = document.querySelectorAll("input");
const btnRegister = document.getElementById("btnRegister");
const formData = document.querySelector('form');
let msg = document.getElementById("msg");

let isValid = false;
let userInfo;



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

// ############################################################

// check if user first time sing up or have info 
if (localStorage.getItem("users") == null) {
    userInfo = [];
  } else {
    userInfo = JSON.parse(localStorage.getItem("users"));
  }

// Events


// delete form reload
formData.addEventListener("submit",function(e){
    e.preventDefault();

   if(isValid === true){
    if(checkExist()){
        msg.classList.remove("d-none")

    }else{
        setForm();  
        resetInputs();
        location.href = "./index.html"
    }
   }
})

// inputs validation

// formData.addEventListener("input",function(){
//     if(validationName(inputs[0]) && validationName(inputs[1]) && validationEmail() && validationPassword() && validationAge()){
//         isValid = true;
//     } else{
//         isValid = false;
//     }
// })



formData.addEventListener("click" ,function(){
    checkFormValidity();
    
})

function checkFormValidity() {
    if (validationName(inputs[0]) &&
        validationName(inputs[1]) &&
        validationEmail() &&
        validationPassword() &&
        validationAge()) {
        isValid = true;
    } else {
        isValid = false;
    }
}

inputs[0].addEventListener("blur" ,function(){
    validationName(inputs[0]);
})

inputs[1].addEventListener("blur" ,function(){
    validationName(inputs[1]);
})
inputs[2].addEventListener("blur" ,function(){
    validationEmail();
})
inputs[3].addEventListener("blur" ,function(){
    validationPassword();
})
inputs[4].addEventListener("blur" ,function(){
    validationAge();
})






// ####################################################################

// functions

// to catch form inputs value 

function setForm(){
    let user = {
        first_name: inputs[0].value,
        last_name: inputs[1].value,
        email: inputs[2].value,
        password: inputs[3].value,
        age: inputs[4].value,
    } 

    // save inputs values in local storage 

    userInfo.push(user);
    localStorage.setItem("users", JSON.stringify(userInfo));
    // console.log(user);
}


// reset inputs

function resetInputs(){
    for(let i =0; i < inputs.length; i++){

        inputs[i].value = "";
    }
}


// check exist email

function checkExist(){
    let cond = false;
    
    for(let i = 0; i< userInfo.length; i++){
        if(inputs[2].value.toLowerCase() === userInfo[i].email.toLowerCase()){
            cond = true;
            break;
        }
    }

    return cond;
}

// ####################################################################

// validation

// name validation

function validationName(input){
    let regex = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/

    if(regex.test(input.value)){

        input.classList.add("is-valid")
        input.classList.remove("is-invalid")

        return true
    }

    else{
        
        input.classList.add("is-invalid")
        input.classList.remove("is-valid")
        return false
    }
}


// email validation

function validationEmail(){
    let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

    if(regex.test(inputs[2].value)){

        inputs[2].classList.add("is-valid")
        inputs[2].classList.remove("is-invalid")

        return true
    }

    else{
        
        inputs[2].classList.add("is-invalid")
        inputs[2].classList.remove("is-valid")
        return false
    }
}


// password validation

function validationPassword(){
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

    if(regex.test(inputs[3].value)){

        inputs[3].classList.add("is-valid")
        inputs[3].classList.remove("is-invalid")

        return true
    }

    else{
        
        inputs[3].classList.add("is-invalid")
        inputs[3].classList.remove("is-valid")
        return false
    }
}


// age validation

function validationAge(){
    let regex = /^([1-7][0-9]|80)$/

    if(regex.test(inputs[4].value)){

        inputs[4].classList.add("is-valid")
        inputs[4].classList.remove("is-invalid")

        return true
    }

    else{
        
        inputs[4].classList.add("is-invalid")
        inputs[4].classList.remove("is-valid")
        return false
    }
}



// ######################################################################