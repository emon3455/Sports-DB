const loadData= async (name)=>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`;
    const res = await fetch(url);
    const data = await res.json(res);
    displayData(data.player);

}

const  displayData=(players)=>{
    const conatiner = document.getElementById("search-Result-container");
    conatiner.innerHTML="";
    const random = "https://picsum.photos/600/300"
    players.forEach(player => {
        const {strThumb,strPlayer,strDescriptionIT,strNationality,idPlayer} = player;
        const div = document.createElement("div");
        div.innerHTML=`
        <div class="card h-96 bg-base-100 shadow-xl w-full">

            <figure><img class="" src="${strThumb? strThumb:random}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title"> ${strPlayer} </h2>
                <p>
                   <span class="font-semibold">Nationality: </span> ${strNationality} 
                </p>

                <div class="card-actions justify-end">
                    <button onclick="singleLoad('${idPlayer}')" class="btn btn-primary">See More</button>
                </div>

            </div>
        </div>
        `;
        conatiner.appendChild(div);
    });
}


const singleLoad=(id)=>{
    const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`;
    fetch(url)
    .then (res=>res.json())
    .then (data=>displaySingleData(data.players[0]))
    .catch(ex=>{
        console.log(ex);
    });
}

const displaySingleData=(data)=>{
   
    const {strGender} = data;
    if(strGender==="Male"){
        document.getElementById("banner1").classList.add("hidden");
        document.getElementById("banner2").classList.remove("hidden"); 
    }
    else{
        document.getElementById("banner1").classList.remove("hidden");
        document.getElementById("banner2").classList.add("hidden");
    }

    const {strThumb,strPlayer,strDescriptionIT,strNationality,strHeight,strFacebook,strInstagram} = data;
    const container = document.getElementById("player-info");
    container.innerHTML=`
        <div class="card card-side bg-base-100 shadow-xl">
            <div>
                <img src="${strThumb}" alt="Movie"/>
            </div>
            <div class="card-body">
                <h2 class="card-title">${strPlayer}</h2>
                <p>${strNationality}</p>
                <p>${strDescriptionIT? strInstagram.slice(0,100)+"...":"No Details Available"}</p>
                <p>${strHeight}</p>
                <p>
                   <span class="font-semibold">Facebook: </span> ${strFacebook} 
                </p>
                <p>
                <span class="font-semibold">Instagram: </span> ${strInstagram} 
                </p>
            </div>
        </div>
    `;
    
    
}

document.getElementById("search-btn").addEventListener("click",()=>{
    
    const inputValue = document.getElementById("input-field").value;
    loadData(inputValue);
    
});

// loadData("messi");

