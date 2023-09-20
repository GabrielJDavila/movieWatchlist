// some variables
let watchlist = JSON.parse(localStorage.getItem("movie")) || []
const placeHolderDiv = document.getElementById("placeholder-container")
const renderedContainer = document.getElementById("rendered-content-container")
const searchField = document.getElementById("search-field")
const searchBtn = document.getElementById("submit-btn")

// event listener to run handleClick when button is clicked
document.addEventListener("click", handleClick)

// function that handles checks or not target item is same as any current movies in watchlist array, calls addToWatchlist() if not or displays a message that it is already in watchlist.
function handleClick(e) {
    if(e.target.dataset.id) {
        if(!watchlist.find(movie => movie.imdbID === e.target.dataset.id)){
            addToWatchlist(e.target.dataset.id)
            e.target.innerText = "Added to Watchlist"
        } else {
            console.log("already in watchlist")
        }
    }
}
// --------------------------------------------------------------

// simple function to add hide class to containers when no movies are searched.
function toggleHide() {
    renderedContainer.classList.remove("hide")
    placeHolderDiv.classList.add("hide")
}

// ----------------------------------------------------

// I only did asyc function for the addToWatchlist function because i wanted to try it out. I dont really use async/await that much. Function adds movie to array, saves it to local storage.
async function addToWatchlist(id) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=6817d0dd&i=${id}`) 
    const data = await res.json()
    watchlist.push(data)
    localStorage.setItem("movie", JSON.stringify(watchlist))
}

// ------------------------------------------------------------------

    // runs when search button is clicked.
    // - Hides the starting html container
    // - declares variable equal to search input value
    // - fetch request to call api with input value
    // - for each movie object returned in data.Search array, called render function on each of them.
function search() {
    toggleHide()
    let inputValue = searchField.value
    fetch(`https://www.omdbapi.com/?apikey=6817d0dd&s=${inputValue}`)
    .then(res => res.json())
    .then(data => {
        let movies = data.Search
        movies.forEach(movie => render(movie.imdbID))
    })
}

searchBtn.addEventListener("click", search)
// ---------------------------------------------------

// - delcares undefined html variable.
// - another fetch request, this time using argument passed through render function.
// - takes data, sets html variable to data.
// - adds html to innerHTML of renderedContainer on each calling of the function.
function render(id) {
    let html = ''
    renderedContainer.innerHTML = html
    fetch(`https://www.omdbapi.com/?apikey=6817d0dd&i=${id}`)
        .then(res => res.json())
        .then(data => {
            html = `
            <div class="rendered-item-container">
                <img src=${data.Poster} class="poster"/>
                <div class="item-info-container">
                    <div class="item-info top-info">
                        <p class="movie-title">${data.Title}</p>
                        <p class="rating">⭐ ${data.imdbRating}</p>
                    </div>
                    <div class="item-info bottom-info">
                        <p class="runtime">${data.Runtime}</p>
                        <p class="genre">${data.Genre}</p>
                        <button class="watchlist" data-id=${data.imdbID}><i id="add-btn" class="fa-solid fa-circle-plus" data-id=${data.imdbID}></i>Watchlist</button>
                    </div>
                    <p class="plot" >${data.Plot}</p>
                </div>
            </div>
            `
            renderedContainer.innerHTML += html
        })
}