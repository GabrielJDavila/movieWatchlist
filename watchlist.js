let watchlist = JSON.parse(localStorage.getItem("movie"))
const watchlistContainer = document.getElementById("rendered-watchlist-container")
const placeholderWatchlistContainer = document.getElementById("placeholder-watchlist-container")

document.addEventListener("click", removeMovie)

// hides initial html container, or watchlist container if empty.
function hide() {
    if(watchlist.length > 0) {
        placeholderWatchlistContainer.classList.add("hide")
    } else if (watchlist.length === 0) {
        placeholderWatchlistContainer.classList.remove("hide")
    }
}

// removes movie from watchlist when clicked. re-renders page.
function removeMovie(e) {
    if(e.target.dataset.id) {
        watchlist = watchlist.filter(movie => movie.imdbID !== e.target.dataset.id)
        localStorage.setItem("movie", JSON.stringify(watchlist))
        renderWatchlist()
    }
}

// renders the page with watchlist data, if any.
function renderWatchlist() {
    let watchlistHtml = ""
    watchlist.forEach(item => {
        watchlistHtml += `
            <div class="rendered-item-container">
                <img src=${item.Poster} class="poster"/>
                <div class="item-info-container">
                    <div class="item-info top-info">
                        <p class="movie-title">${item.Title}</p>
                        <p class="rating">⭐ ${item.imdbRating}</p>
                    </div>
                    <div class="item-info bottom-info">
                        <p class="runtime">${item.Runtime}</p>
                        <p class="genre">${item.Genre}</p>
                        <button class="watchlist" data-id=${item.imdbID}><i id="remove-btn" class="fa-solid fa-circle-minus" data-id=${item.imdbID}></i> Remove</button>
                    </div>
                    <p class="plot" >${item.Plot}</p>
                </div>
            </div>
        `
    })
    hide()
    watchlistContainer.innerHTML = watchlistHtml
}

// initializing first render when page is loaded.
renderWatchlist()