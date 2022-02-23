import './css/styles.css';
import Notiflix from 'notiflix';
import { getRefs } from './js/getRefs';
import FetchImages from './js/fetchImages';
import renderImages from './js/renderImages';
import LoadMoreBtn from './js/loadMoreBtn';

const refs = getRefs();

const fetchImages = new FetchImages();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(event) {
  event.preventDefault();
  clearGalleryImages();
  fetchImages.query = event.currentTarget.elements.query.value.trim();
  if (fetchImages.query === '') {
    return
  }
  fetchImages.resetPage();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  fetchImages.fetchImages().then(articles => {
    const totalHits =
      articles.totalHits - (fetchImages.page * articles.hits.length - articles.hits.length);

    if (articles.hits.length === 0) {
      disableLoadMoreBtn();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    if (totalHits < 40 || articles.hits.length < 40) {
      disableLoadMoreBtn();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    if (totalHits > 40) {
      loadMoreBtn.show();
      loadMoreBtn.enable();
    }

    renderImages(articles);
  });
}

function clearGalleryImages() {
  refs.gallery.innerHTML = '';
}

function disableLoadMoreBtn() {
  loadMoreBtn.hide();
  loadMoreBtn.disable();
}
