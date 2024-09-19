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


const searchParams = location.search;

const params = new URLSearchParams(searchParams);

const id = params.get("id");

(async function () {

    const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": "9e04c76662msh03b9955afc3013cp13714bjsnb26808cdf9ef",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
  const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options);
  
  const response = await api.json();
//   console.log(response);
  displayData(response)
  

})();


function displayData(data) {
    let detailsBox = `
    
    <div class="col-md-4">
    <figure>
       <img src="${data.thumbnail}" class="w-100" alt="details image" />
    </figure>
 </div>
 <div class="col-md-8">
 
    <div>
       <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
             <li class="breadcrumb-item text-reset"><a href="./home.html">Home</a></li>
             <li class="breadcrumb-item text-info" aria-current="page">${data.title}</li>
          </ol>
       </nav>
 
       <h1>${data.title}</h1>
 
       <h3>About ${data.title}</h3>
       <p>${data.description}</p>
       <p>platform : ${data.platform}</p>
       <p>Minimum System Requirements : </p>
       <p>OS : ${data.minimum_system_requirements?.os || "N/A"}</p>
       <p>PROCESSOR : ${data.minimum_system_requirements?.processor || "N/A"}</p>
       <p>MEMORY : ${data.minimum_system_requirements?.memory || "N/A"}</p>
       <p>GRAPHICS : ${data.minimum_system_requirements?.graphics || "N/A"}</p>
       <p>STORAGE : ${data.minimum_system_requirements?.storage || "N/A"}</p>
       <p>Released in : ${data.release_date}</p>
       <a target="_blank" href="${data.freetogame_profile_url}">Profile URL</a>
       
    </div>
 </div>
 
    `;
 
    document.getElementById("detailsData").innerHTML = detailsBox;
    document.body.style.cssText = `background:url('${data.thumbnail.replace("thumbnail", "background")}') center / cover no-repeat`;
 }