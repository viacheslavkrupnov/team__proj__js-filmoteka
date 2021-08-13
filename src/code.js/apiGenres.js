//запрос на жанры
function fetchGenres() {
    return fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=b28a43708d64e0a6bb2d8707a913b498&language=en-US%27')
        .then(r => r.json())
        .then(({ genres }) => {
            let temp = {};
            for (let genre of genres) {
                temp[genre.id] = genre.name;
            };
            return temp;
        })
}

export default fetchGenres;