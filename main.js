"use strict";

//TODO: call DOM
let homeIcon = document.getElementById("home");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn");
let loading = document.getElementById("loading");
let movieInfo = document.getElementById('movie-info');
let movieSelection = document.getElementById('movie-selection');


//TODO: call DOM API
let pic = document.querySelectorAll('.pic');
let title = document.querySelectorAll('.title');
let year = document.querySelectorAll('.year');
let rating = document.querySelectorAll('.rating');
let genre = document.querySelectorAll('.genre');
let director = document.querySelectorAll('.director');
let plot = document.querySelectorAll('.plot');
let selectMovie = document.querySelectorAll('.new-movie');

//OMDb API
// https://www.omdbapi.com/?apikey=eecd0f67&s=avengers
// http://www.omdbapi.com/?apikey=eecd0f67&t=shrek

//TODO: ON-LOAD
$(function() {


    //TODO: THIS FUNCTIONS RENDERS THE INFO TO ALL MOVIES WITH THE SAME TITLE
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
                         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Launch demo modal
                         </button>
                        </div>`

                }

                localStorage.setItem('movie', JSON.stringify(html));

                return movieSelection.innerHTML = html;
            });

    });



    //TODO: THIS FUNCTION WILL DISPLAY THE INFORMATION BASED ON THE TITLE THE USER SELECTED (CLICK)


});


