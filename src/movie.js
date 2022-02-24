const TMDB_API_KEY = "3a377862d155dc0b034c393fad709b13";
const IMAGE_URL = "https://image.tmdb.org/t/p";
const BASE_URL = "https://api.themoviedb.org/3/movie";
const POPULAR_URL = `${BASE_URL}/popular`;
const LANGUAGE = "ko-KR";
const backdropImage = document.querySelector(".backdrop__image");

const moviePoster = document.querySelector(".movie__poster__image");
const movieTitle = document.querySelector(".movie__detail__title");
const movieGenres = document.querySelector(".movie__detail__genres");
const movieRating = document.querySelector(".movie__detail__rating");
const movieOverview = document.querySelector(".movie__detail__overview");
const homepageBtn = document.querySelector(".btn-homepage");
const reloadBtn = document.querySelector(".btn-reload");

const getRandom = () => Math.floor(Math.random() * 20);

const craeteBackdrop = (url) => {
    backdropImage.src = `${IMAGE_URL}/original${url}`;
}

const getMovie = async () => {
    const { results } = await fetch(`${POPULAR_URL}?api_key=${TMDB_API_KEY}`)
        .then(res => res.text())
        .then(data => JSON.parse(data));

    const index = getRandom();
    const movie = results[index];
    craeteBackdrop(movie.backdrop_path);

    const detail = await fetch(`${BASE_URL}/${movie.id}?api_key=${TMDB_API_KEY}&language=${LANGUAGE}`)
        .then(res => res.text())
        .then(data => JSON.parse(data));

    return detail;
}

const createMoiveElements = (movie) => {
    moviePoster.src = `${IMAGE_URL}/w500${movie.poster_path}`;
    movieTitle.innerText = `${movie.title} (${movie.release_date.slice(0, 4)})`;
    movieGenres.innerText = movie.genres.map(genre => genre.name);
    movieRating.innerText = `평점 : ⭐️ ${movie.vote_average} / 10`;
    movieOverview.innerText = movie.overview === "" ? "(이 영화는 아직 한글 영화 소개가 제공되지 않습니다.)" : movie.overview;
    homepageBtn.href = movie.homepage;
}

async function init() {
    const movie = await getMovie();
    createMoiveElements(movie);
    reloadBtn.removeEventListener("click", init);
    reloadBtn.addEventListener("click", init);
}

init();
