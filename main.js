
var modalbg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');
let ImgClick=document.getElementsByClassName("recipes-img")
let textUL = document.getElementById("text");
 
let searchBtn = document.getElementById("search-btn")

let mainDiv = document.getElementById("over")

searchBtn.addEventListener('click', function(){
    mainDiv.innerHTML=""
fetchig(document.getElementById("search-text2").value,document.getElementById("search-text").value) 
    console.log(document.getElementById("search-text2").value)
    console.log(document.getElementById("search-text").value)

})

function fetchig(tags,word){
    
fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${tags}&q=${word}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "6f45bb20b3msh8b06b505f7fcf88p1a7957jsne56925132b41"
	}
})


.then((response) => response.json()) //2

.then((recipes) => {
    console.log(recipes);
    

    let brekky = recipes.results;

   

    for(i in brekky){


        let inerDiv = document.createElement("div");

        let title = document.createElement("h3");
        title.innerText = brekky[i].name 
        

        let img = document.createElement("img");

        
        img.src =brekky[i].thumbnail_url;

        img.classList.add("recipes-img");
        title.classList.add("recipes-title")
        inerDiv.classList.add("box-of-content")
      
        inerDiv.appendChild(img);
        inerDiv.appendChild(title);
        mainDiv.appendChild(inerDiv);
        
        let recipesID = brekky[i].id  
        img.setAttribute("data-ID",recipesID) 

        img.addEventListener('click',function(){ 
            fetch("https://tasty.p.rapidapi.com/recipes/detail?id="+recipesID, { 
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "tasty.p.rapidapi.com",
                    "x-rapidapi-key": "6f45bb20b3msh8b06b505f7fcf88p1a7957jsne56925132b41"
                }
                })
                .then(function(serverPromise){
                    serverPromise.json()
                     .then(function(j) {
                        if(brekky[i].instructions==undefined){   
                            console.log("hello")
                        }
                        else{
                                for(let x=0;x< brekky[i].instructions.length;x++){ 
                                let innerLI=document.createElement("li")
                                let textNode = document.createTextNode(j.instructions[x].display_text);
                                innerLI.appendChild(textNode)
                                textUL.appendChild(innerLI)
                            }
                        }
                     })
                     .catch(function(e){
                      console.log(e);
                     });
                   })
                   .catch(function(e){
                     console.log(e);
                    });


            modalbg.classList.add('bg-active');
        });
        
        modalClose.addEventListener('click',function(){
            textUL.innerText=""
            modalbg.classList.remove('bg-active');
        });
         
        
        }


 
}); 

}

