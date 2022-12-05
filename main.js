"use strict";

//call DOM
let homeIcon = document.getElementById("home");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let loading = document.getElementById("loading");
let movieInfo = document.getElementById('movie-info');
let movieSelection = document.getElementById('movie-selection');

//call DOM API

let pic = document.querySelectorAll('.pic');
let title = document.querySelectorAll('.title');
let year = document.querySelectorAll('.year');
let rating = document.querySelectorAll('.rating');
let genre = document.querySelectorAll('.genre');
let director = document.querySelectorAll('.director');
let plot = document.querySelectorAll('.plot');

//OMDb API

// https://www.omdbapi.com/?apikey=eecd0f67&s=avengers

// http://www.omdbapi.com/?apikey=eecd0f67&t=shrek






searchBtn.addEventListener('click', function (e) {

    e.preventDefault();

    const token = OMDB_API;
    let userInput = searchInput.value;
    const URL = `https://www.omdbapi.com/?apikey=${token}&s=${userInput}`

    fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw Error('ERROR');
            }
            return response.json();
        })
        .then(data => {
            const searchData = data.Search;

            let html = "";
            for (let i = 0; i < searchData.length; i++) {
                html += `<div id="${searchData[i].imdbID}" class="new-movie">
                        <h1>${searchData[i].Title}</h1>
                         <h6>${searchData[i].Year}</h6>
                        </div>`

            }
            return movieSelection.innerHTML = html;
        });

});





