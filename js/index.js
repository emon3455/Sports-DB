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
    players.slice(0,2).forEach(player => {
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


document.getElementById("search-btn").addEventListener("click",()=>{
    const inputValue = document.getElementById("input-field").value;
    loadData(inputValue);
});

loadData("messi");

