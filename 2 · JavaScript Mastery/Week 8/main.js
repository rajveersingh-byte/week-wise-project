const API_KEY = "04c35731a5ee918f014970082a0088b1";

const moviesContainer =
document.getElementById("moviesContainer");

const searchInput =
document.getElementById("searchInput");


async function getPopularMovies(){

    const response = await fetch(
        
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    const data = await response.json();

    displayMovies(data.results);
}



async function searchMovies(query){

    const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await response.json();

    displayMovies(data.results);
}



function displayMovies(movies){

    moviesContainer.innerHTML = "";

    movies.forEach(movie => {

        const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750";

        const card = document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${poster}" alt="">
            
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average.toFixed(1)}</p>
            </div>
        `;

        moviesContainer.appendChild(card);
    });
}



searchInput.addEventListener("keyup", () => {

    const query = searchInput.value.trim();

    if(query.length > 0){
        searchMovies(query);
    }else{
        getPopularMovies();
    }
});



getPopularMovies();