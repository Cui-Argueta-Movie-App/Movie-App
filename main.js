"use strict";

//TODO: call DOM
let homeIcon = document.getElementById("home");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let loading = document.getElementById("loading");
let movieInfo = document.getElementById('movie-info');
let movieSelection = document.getElementById('movie-selection');

//OMDb API
// https://www.omdbapi.com/?apikey=eecd0f67&s=avengers
// http://www.omdbapi.com/?apikey=eecd0f67&t=shrek



//TODO: ON-LOAD
$(function() {
    //TODO: THIS FUNCTIONS RENDERS THE INFO TO ALL MOVIES WITH THE SAME TITLE
    // searchBtn.addEventListener('click', function (e) {
    //
    //     e.preventDefault();
    //
    //     const token = OMDB_API;
    //     let userInput = searchInput.value;
    //     const URL = `https://www.omdbapi.com/?apikey=${token}&s=${userInput}`
    //
    //     fetch(URL)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw Error('ERROR');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             const searchData = data.Search;
    //
    //             let html = "";
    //             for (let i = 0; i < searchData.length; i++) {
    //                 html += `<div class="new-movie">
    //                     <h1>${searchData[i].Title}</h1>
    //                      <h6>${searchData[i].Year}</h6>
    //                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="movie-${i + 1}">
    //                         Launch demo modal
    //                      </button>
    //                     </div>
    //
    //
    //                     <div class="modal fade" id="movie-${i + 1}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //                     <div class="modal-dialog">
    //                     <div class="modal-content">
    //                         <div class="modal-header">
    //                             <h1 class="modal-title fs-5" id="exampleModalLabel">${searchData[i].Title}</h1>
    //                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                         </div>
    //                         <div class="modal-body">
    //                             ...
    //                         </div>
    //                         <div class="modal-footer">
    //                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //                             <button type="button" class="btn btn-primary">Save changes</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>`
    //
    //                 // console.log(html);
    //
    //             }
    //             localStorage.setItem('movie', JSON.stringify(html));
    //
    //             return movieSelection.innerHTML = html;
    //
    //         });
    //
    // });

    async function loadMovies() {
        let movieTitle = searchInput.value;
        const token = OMDB_API;
        const URL = `https://www.omdbapi.com/?apikey=${token}&s=${movieTitle}`

        const response = await fetch(URL);
        const obj = await response.json()

        const searchData = obj.Search;

        return searchData;

    }



    const displaySearchTitles = (movieTitles) => {
        let html = "";
        for (let i = 0; i < movieTitles.length; i++) {
            html += `<div class="card" style="width: 18rem;" data-id="${movieTitles[i].imdbID}">
                      <img src="${movieTitles[i].Poster}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${movieTitles[i].Title}</h5>
                        <p class="card-text">${movieTitles[i].Year}</p>
                        <a href="#movieSelected${i + 1}" class="btn btn-primary">More Info</a>
                      </div>
                    </div>`

            console.log(html);
        }
        return movieSelection.innerHTML = html;
    }


    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();
        (async () => {
            let searchInfo = await loadMovies();
            console.log(searchInfo);

            displaySearchTitles(searchInfo);
        })();
    })
});


