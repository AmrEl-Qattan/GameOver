
let h5 = document.getElementById("gameOver");
let loading = document.querySelector(".loading");


// Events
document.querySelectorAll(".menu a").forEach(function(link){
    link.addEventListener("click" , function(){
    document.querySelector(".menu .active").classList.remove("active");
    link.classList.add("active");     
    
    const category = link.getAttribute("data-category");
    getGames(category);
        
    });
});

getGames("mmorpg");


h5.addEventListener("click",function(){
   getGames("mmorpg");
})

document.querySelector(".logout-btn").addEventListener("click" ,function(){
   localStorage.removeItem("sessionUserEmail");
   location.href = "./index.html";
})

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



// #################################################################

// functions

async function getGames(category){

   loading.classList.remove("d-none");

    const options = {
        method: "GET",
        headers: {
           "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
           "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
           Accept: "application/json",
           "Content-Type": "application/json",
        },
     };

    let api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    let response = await api.json();
   //  console.log(response);
    displayData(response);
    loading.classList.add("d-none");
}


function displayData(gamesData){
    let gamesBox = ``;

    for(let i = 0; i<gamesData.length;i++){

      let videoPath = gamesData[i].thumbnail.replace("thumbnail.jpg" , "videoplayback.webm");
     
        gamesBox += `<div class="col">
      <div onmouseenter="startVideo(event)" onmouseleave="stopVideo(event)" onclick="showDetails(${gamesData[i].id})" class="card h-100 bg-transparent" role="button" >
         <div class="card-body">
            <figure class="position-relative">

               <img class="card-img-top object-fit-cover h-100" src="${gamesData[i].thumbnail}" />

             <video muted="true"  preload="none" loop   class="w-100 d-none h-100 position-absolute top-0 start-0 z-3">
              <source src="${videoPath}">
              </video>

            </figure>

            <figcaption>

               <div class="hstack justify-content-between">
                  <h3 class="h6 small">${gamesData[i].title}</h3>
                  <span class="badge text-bg-primary p-2">Free</span>
               </div>

               <p class="card-text small text-center  opacity-50">
                  ${gamesData[i].short_description}
               </p>

            </figcaption>
         </div>

         <footer class="card-footer small hstack justify-content-between">

            <span class="badge badge-color text-white">${gamesData[i].genre}</span>
            <span class="badge badge-color text-white">${gamesData[i].platform}</span>

         </footer>
      </div>
   </div>`
    }

    document.getElementById("gameData").innerHTML = gamesBox;
}


function startVideo(event){
   let videoElement = event.target.querySelector("video");
  
   videoElement.classList.remove("d-none");
   videoElement.muted = true;
   videoElement.play();
   
}
function stopVideo(event){
   let videoElement = event.target.querySelector("video");
  
   videoElement.classList.add("d-none");
   videoElement.muted = true;
   videoElement.pause();
   
}


function showDetails(id){
   location.href = `./details.html?id=${id}`
   
}

