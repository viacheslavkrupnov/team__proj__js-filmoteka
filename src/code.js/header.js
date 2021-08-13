/*Kate SEA меняю стили header*/
import SearchApiTrend from "./apiTrendservice.js";
import trendMovieTpl from "../templates/withoutRating.hbs";
import refs from './refs';
import renderMovies from "./trendMarkUp.js";
import fetchGenres from "./apiGenres.js";
import showWatchedCollection from "./myLib.js";
import PaginationService from "./pagination.js";
import SearchService from './apiService.js';

import { debounce } from "debounce";

const Theme = {
    HOME: 'header__home__theme',
    MYLIBRARY: 'header__ml__theme',
};

export const paginationService = new PaginationService();

homeInit();
function homeInit() {
    SearchApiTrend.fetchTrends().then(({ results, totalPages }) => {
        paginationService.setCallback(fetchTrends);
        paginationService.setTotalPages(totalPages);

        renderMovies(results);
    })
};

function fetchTrends(page) {
    SearchApiTrend.fetchTrends(page).then(({ results, totalPages }) => {
        paginationService.setTotalPages(totalPages);
        renderMovies(results);
    })
}

refs.logoLink.addEventListener('click', onHomeLinkClick);
refs.libraryLink.addEventListener('click', onMyLibraryLinkClick);
refs.homeLink.addEventListener('click', onHomeLinkClick);
refs.inputRef.addEventListener('input', debounce(onMovieSearch, 500));

// вешаем слушателей на pagination
refs.pr.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') {
        return
    }

    paginationService.prevPage();
})

refs.next.addEventListener('click', e => {
    paginationService.nextPage();
})


refs.fBtn.addEventListener('click', e => {
    paginationService.firstPage();
})

refs.lBtn.addEventListener('click', e => {
    paginationService.lastPage();
})

refs.btnList.addEventListener('click', e => {
    if (e.target.nodeName !== 'BUTTON') {
        return
    };

    paginationService.changePage(+e.target.textContent);
})



function onHomeLinkClick(event) {
    event.preventDefault();
    refs.input.value = '';
    refs.trendContainer.innerHTML = '';
    refs.headerForm.classList.remove('none');
    refs.button.classList.add('none');

    changeHeadersTheme(Theme.HOME);
    paginationService.setPage(1)
    //отрисовываем фильмы на домашней странице
    homeInit();

    // отрисовка кнопок пагинации
    refs.paginationButtons.classList.remove('visually-hidden')
}

function onMyLibraryLinkClick(event) {
    event.preventDefault();
    refs.button.classList.remove('none');
    refs.headerForm.classList.add('none');

    changeHeadersTheme(Theme.MYLIBRARY);
    
    document.querySelector('[data-name="show__watched"]').classList.add('active__btn');
    document.querySelector('[data-name="show__queue"]').classList.remove('active__btn');
    showWatchedCollection();
}


function changeHeadersTheme(theme) {
    if (theme === Theme.HOME) {
        refs.header.classList.remove(Theme.MYLIBRARY);
        refs.header.classList.add(Theme.HOME);
        refs.homeLink.classList.add('nav__item--current');
        refs.libraryLink.classList.remove('nav__item--current');

    } else {
        refs.header.classList.remove(Theme.HOME);
        refs.header.classList.add(Theme.MYLIBRARY);
        refs.homeLink.classList.remove('nav__item--current');
        refs.libraryLink.classList.add('nav__item--current');
    }
}

function onMovieSearch() {
    if (refs.inputRef.value) {
        paginationService.setCallback(fetchByInputQuery)
    } else {
        paginationService.setCallback(fetchTrends)
    }
    paginationService.firstPage();

}
async function fetchByInputQuery(page) {
    const api = new SearchService();
    api.query = refs.inputRef.value;
    api.setPage(page);
    
    const { results, total_pages: totalPages } = await api.fetchFilm();
    paginationService.setTotalPages(totalPages);

    renderMovies(results);
}