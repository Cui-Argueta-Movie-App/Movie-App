document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.querySelector("#loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 1000);
    }
};


const tmdb = TMDB_API;
const BASE_URL = 'https://api.themoviedb.org/3';
const tmdb_API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&api_key='+ tmdb;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURl = BASE_URL + '/search/movie?&api_key='+ tmdb;
//DOM

let main = document.getElementById('main');
let detail = document.getElementById('detail');
let inputSearch = document.getElementById('input-search');
let btnSearch = document.getElementById('btn-search');
let form = document.getElementById('form');
let watchlistEl = document.getElementById('watchlist');
let resultEl = document.getElementById('resultSearch');


getMovies(tmdb_API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        //console.log(data);
        showmovies(data.results);
    })
}

const showResult = (userInput) => {
    let html = "";
    html += `<h3 class="text-muted">Results for: "${userInput.toLowerCase()}"</h3>`
    return resultEl.innerHTML = html;
}

function showmovies(data){
    main.innerHTML = "";
    data.forEach(movie => {
        const {title,poster_path,vote_average,overview,id} = movie
        const movieElement = document.createElement('div');
        movieElement.setAttribute("id","searchListItem");
        movieElement.classList.add('container');
        movieElement.innerHTML =`
            <div class="card" style="width: 18rem;">
              <img src="${IMG_URL+poster_path}" class="card-img-top" alt="no-poster.png">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">Rate：${vote_average}</p>
                 <button class="btn btn-outline-success" type="submit" id="${id}">More Info</button>
              </div>
            </div>`




        main.appendChild(movieElement);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id)
            openNav(movie)
        })
    });
}
//more info
function openNav(movie){
    let id = movie.id;
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdb}`).then(res => res.json()).then(data=>{
        console.log(data)

        const movieDetail = data;
        movieDescHTML(movieDetail);
    })
}



const movieDescHTML = (data) => {
    console.log(detail);
    console.log(data);

    const {original_title, overview, release_date, tagline, poster_path, id } = data;

    const movieElement = document.createElement('div');
    movieElement.setAttribute("id","movieDescCard");
    movieElement.innerHTML =
        `<div class="card mb-3" style="max-width: 100%; height: 100%;">
      <button type="button" class="btn-close p-0 fs-5" aria-label="Close" id="close" onclick="this.parentNode.parentNode.remove(); return false;"></button>

  <div class="row g-0">
  
    <div class="col-md-5">
      <img src="${IMG_URL+poster_path}" class="rounded-start w-100" alt="...">
    </div>
    
    <div class="col-md-7 d-flex flex-column">
    <div class="card-header">
        <p class="visually-hidden" id="visually-hidden">${id}</p>
        <h1 class="card-title">${original_title} <span class="card-text fs-5">(${release_date})</span></h1>
    </div>
    <h5 class="card-text text-muted my-4 px-2" id="tagline">${tagline}</h5>
    
      <div class="card-body">
        <p class="card-text fs-3">${overview}</p>
         <h5 className="card-text">
             <small className="text-muted">${data.genres[0].name}</small>, 
             <small className="text-muted">${data.genres[1].name}</small>, 
             <small className="text-muted">${data.genres[2].name}</small>
         </h5>
        <button class="btn btn-outline-success add w-100" type="submit" id="add${id}">Add</button>
      </div>
      
      </div>
    </div>
</div>`

    detail.appendChild(movieElement)

    document.getElementById('close').onclick = function(){
        this.parentNode.parentNode.remove();
        return false;
    }
    //add
    document.getElementById(`add${id}`).addEventListener('click', () => {
        console.log(id)
        post(data);
    })


}

//POST
function post(data){
    const {original_title, overview, release_date, tagline, id} = data;
    console.log("put: " + data.id);
    fetch('https://coffee-burnt-hurricane.glitch.me/movies',{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(res=>{
            if(res.ok){
                console.log(res.ok);
                alert("Added to your Watchlist!");
            }
        })
}


//search
btnSearch.addEventListener('click',function(e) {
    e.preventDefault();
    // alert("click")
    let name = inputSearch.value;
    getMovies(searchURl + '&query=' + name);
    showResult(name);
});

//watch list
document.getElementById('nav-profile-tab').addEventListener('click',function (){
    //data[0].id
    fetch('https://coffee-burnt-hurricane.glitch.me/movies').then(res => res.json()).then(function (data){
        console.log(data)
        console.log(data[0].title);
        document.getElementById('watchlist').innerHTML = "";
        data.forEach(movie => {
            // const {title,poster_path,vote_average,overview,id} = movie;
            let id;
            const mlist = document.createElement('div');
            mlist.setAttribute("id","searchListItem");
            mlist.classList.add('container');
            if(movie.title === undefined){
                mlist.innerHTML =`
                                <div class="card" style="width: 18rem;">
                                  <img src="${IMG_URL+movie.movie.poster_path}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <h5 class="card-title">${movie.movie.title}</h5>
                                    <p class="card-text">${movie.movie.vote_average}</p>
                                    <button class="btn btn-outline-success" type="submit" id="edit${movie.movie.id}">okEdit</button>
                                    <button class="btn btn-outline-success" type="submit" id="del${movie.movie.id}">Delete</button>
                                  </div>
                              </div>`
                id = movie.movie.id;
            }else{
                mlist.innerHTML = `
                                <div class="card" style="width: 18rem;">
                                  <img src="${IMG_URL + movie.poster_path}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <h5 class="card-title">${movie.original_title}</h5>
                                    <p class="card-text">${movie.tagline}</p>
                                    <p class="card-text">Rate：${movie.vote_average}</p>
                                    <button class="btn btn-outline-success" type="submit" id="edit${movie.id}">Edit</button>
                                    <button class="btn btn-outline-success" type="submit" id="del${movie.id}">Delete</button>
                                  </div>
                              </div>`
                id = movie.id;
            }
            document.getElementById('watchlist').appendChild(mlist);


            $(`#edit${movie.id}`).click(e => {
                e.preventDefault();
                console.log(movie);
                console.log("click");
                let html = "";
                html += `<div class="card" style="width: 18rem;">
                                  <img src="${IMG_URL + movie.poster_path}" class="card-img-top" alt="...">
                                  <div class="card-body">
                                    <div class="input-group">
                                      <span class="input-group-text" id="addon-wrapping">NOTE</span>
                                      <input id='titleInput' type="text" class="form-control" placeholder="" aria-label="Username" aria-describedby="addon-wrapping">
                                      </div>
                                      <br>
                                      <div class="input-group">
                                      <span class="input-group-text" id="addon-wrapping">Rating</span>
                                      <input id='ratingInput' type="text" class="form-control" placeholder="${movie.vote_average}" aria-label="Username" aria-describedby="addon-wrapping">
                                    </div>
                                    <br>
                                    <button class="btn btn-outline-success" type="submit" id="ok${movie.id}">OK</button>
                                    <button class="btn btn-outline-success" type="submit" id="cel${movie.id}" >Cancel</button>
                                  </div>
                              </div>`;
                // console.log(movie.id)
                document.getElementById('watchlist').innerHTML = html;


                //edit ok
                document.getElementById(`ok${movie.id}`).addEventListener('click', () => {
                    // console.log(movie);
                    movie.tagline = document.getElementById('titleInput').value;
                    movie.vote_average = document.getElementById('ratingInput').value;
                    fetch(`https://coffee-burnt-hurricane.glitch.me/movies/${id}`,{
                        method:"PUT",
                        headers:{
                            'Content-type':'application/json'
                        },
                        body: JSON.stringify(movie),
                    })
                        .then(res=>{
                            if(res.ok){
                                alert("Add to your list!");
                                location.reload();
                            }
                        })
                })


                //cancel
                document.getElementById(`cel${movie.id}`).addEventListener('click',function (){
                    location.reload();
                })


            })






            //del
            document.getElementById(`del${id}`).addEventListener('click', () => {
                //console.log("del is working")
                //console.log(id)
                    console.log('del data ' + id)
                    fetch(`https://coffee-burnt-hurricane.glitch.me/movies/${id}`,{
                        method:"DELETE",
                        headers:{
                            'Content-type':'application/json'
                        },
                    })
                        .then(res =>{
                            if(res.ok){
                                alert("Deleted from your list.")
                            }
                        })
            })



        });
    } )
})






// < p
// className = "card-text" > < small
// className = "text-muted" >${data.genres[0].name} < /small>, <small className="text-muted">${data.genres[1].name}</sm
// all >, <small className="text-muted">${data.genres[2].name}</small>
// </p>