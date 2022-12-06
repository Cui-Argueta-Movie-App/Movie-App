const omdb = OMDB_API;
const tmdb = TMDB_API;
const BASE_URL = 'https://api.themoviedb.org/3';
const tmdb_API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&api_key='+ tmdb;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURl = BASE_URL + '/search/movie?'+ tmdb;
//DOM

let main = document.getElementById('main');
let inputSearch = document.getElementById('input-search');
let btnSearch = document.getElementById('btn-search');
let form = document.getElementById('form')

getMovies(tmdb_API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        showmovies(data.results);
    })
}

function showmovies(data){
    main.innerHTML = "";
    data.forEach(movie => {
        const {title,poster_path,vote_average,overview} = movie
        const movieElement = document.createElement('div');
        movieElement.classList.add('container');
        movieElement.innerHTML =`
        <div class="row">
        <div class="card">
          <img src="${IMG_URL+poster_path}" alt="no-poster.png">
          <h3>${title}</h3>
          <p>${vote_average}</p>
          <p>Overview:<br>${overview}</p>
          <a href="" class="btn">Read More</a>
        </div>
      </div>
        `

        main.appendChild(movieElement)
    });
}

//search
// btnSearch.addEventListener('click',function(e){
//     e.preventDefault();
//     // alert("click")

//     let movieName = inputSearch.value;

//     getMovies(searchURl + '&query='+ movieName)


// })

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = inputSearch.value;

    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        alert('not !!!')
    }

})