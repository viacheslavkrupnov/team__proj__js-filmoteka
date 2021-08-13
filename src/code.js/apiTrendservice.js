const API_KEY = 'b28a43708d64e0a6bb2d8707a913b498';
const BASE_URL = 'https://api.themoviedb.org/3';


function fetchTrends(n = 1) {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${n}`)
    .then(r => {
        if (r.ok) {
            return r.json()
        }
})
.then(({ results, total_pages }) => {
    return {results, totalPages: total_pages}; 
})
.catch(error => console.log(error));
}

export default {fetchTrends};