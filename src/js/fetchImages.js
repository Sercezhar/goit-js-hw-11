const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25743920-c7da85e05a5524610af3b91e0';

export default class FetchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    )
      .then(response => response.json())
      .then(data => {
        this.increasePage();
        return data;
      });
  }

  increasePage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
