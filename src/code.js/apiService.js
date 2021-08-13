const API_KEY = 'b28a43708d64e0a6bb2d8707a913b498';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?';

export default class newsApiService{
    constructor (){
        this.searchQuery = '';
        this.page = 1;
    }    
    async fetchFilm() {
        const url = `${BASE_URL}api_key=${API_KEY}&language=en-US&page=${this.page}&include_adult=false&query=${this.searchQuery}`;        
        const film = await fetch(url);
        const newFilms = await film.json();
        return newFilms;
    }
    
    setPage(page) {
        this.page = page;
    }
    
    
    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
}