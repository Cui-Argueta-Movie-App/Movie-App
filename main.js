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

    const searchData = []

    const fetchSearchData = (url) => {
        fetch(url)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw Error('ERROR');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                return data;
            });
    }

    const fetchMovieData = (url) => {
        fetch(url)
            .then(response => {
                console.log(response);
                if (!response.ok) {
                    throw Error('ERROR');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                return data;
            });
    }

    const fetchBothData = () => {
        const token = OMDB_API;
        let userInput = searchInput.value;
        const searchURL = `https://www.omdbapi.com/?apikey=${token}&s=${userInput}`;
        const movieInfoURL = `http://www.omdbapi.com/?apikey=${token}&i=`;

        fetchSearchData(searchURL);
    }
    fetchBothData()





});



