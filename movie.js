const apiKey = '230fc5973d8244492ad62dbd5f794c63';
const userName = localStorage.getItem('currentProfile');
document.getElementById('profileName').textContent = `Profil uživatele: ${userName}`;
document.getElementById('backToProfileListButton').addEventListener('click', () => {
    window.location.href = 'index.html'; 
});

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');


function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    }
}

const searchMovies = debounce(async function() {
    const query = searchInput.value;
    if (query) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=cs-CZ`);
            const data = await response.json();
            displaySearchResults(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    } else {
        searchResults.innerHTML = ''; 
    }
}, 300); 

searchInput.addEventListener('input', searchMovies);

function displaySearchResults(movies) {
    searchResults.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const description = document.createElement('p');
        description.textContent = movie.overview;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to list';
        addButton.addEventListener('click', () => addMovieToList(movie));

        movieCard.appendChild(title);
        movieCard.appendChild(description);
        movieCard.appendChild(addButton);
        searchResults.appendChild(movieCard);
    });
}

function addMovieToList(movie) {
    let movies = JSON.parse(localStorage.getItem(`${userName}_movies`)) || [];
    if (!movies.find(m => m.id === movie.id)) {
        movies.push({ ...movie, watched: false });
        localStorage.setItem(`${userName}_movies`, JSON.stringify(movies));
        displayMyMovies();
    }
}

function displayMyMovies() {
    const myMovieList = document.getElementById('myMovieList');
    myMovieList.innerHTML = '';

    let movies = JSON.parse(localStorage.getItem(`${userName}_movies`)) || [];

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const description = document.createElement('p');
        description.textContent = movie.overview;

        const watchedCheckbox = document.createElement('input');
        watchedCheckbox.type = 'checkbox';
        watchedCheckbox.checked = movie.watched;
        watchedCheckbox.addEventListener('change', () => toggleWatchedStatus(movie.id));

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeMovieFromList(movie.id));

        movieCard.appendChild(title);
        movieCard.appendChild(description);
        movieCard.appendChild(watchedCheckbox);
        movieCard.appendChild(removeButton);
        myMovieList.appendChild(movieCard);
    });
}

function toggleWatchedStatus(movieId) {
    let movies = JSON.parse(localStorage.getItem(`${userName}_movies`)) || [];
    let movie = movies.find(m => m.id === movieId);
    if (movie) {
        movie.watched = !movie.watched;
        localStorage.setItem(`${userName}_movies`, JSON.stringify(movies));
        displayMyMovies();
    }
}

function removeMovieFromList(movieId) {
    let movies = JSON.parse(localStorage.getItem(`${userName}_movies`)) || [];
    movies = movies.filter(m => m.id !== movieId);
    localStorage.setItem(`${userName}_movies`, JSON.stringify(movies));
    displayMyMovies();
}

window.addEventListener('DOMContentLoaded', displayMyMovies);
