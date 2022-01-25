'use ctrict';
import './css/styles.css';
import { fetchCountry } from './js/fetchCountries.js';
import CountriesThatMatch from './handlebars/listItems.hbs';
import CountryInfo from './handlebars/countryInfo.hbs';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const serchBoxEl = document.querySelector('#search-box');
const listOfCountriesEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

serchBoxEl.addEventListener('input', debounce(callSerchCountries, DEBOUNCE_DELAY));

function callSerchCountries(event) {
  const keyword = event.target.value.trim();
  countryInfoEl.innerHTML = '';
  listOfCountriesEl.innerHTML = '';
  fetchCountry(keyword)
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (response.length > 2 && response.length <= 10) {
        response.forEach(el => {
          listOfCountriesEl.insertAdjacentHTML('beforeend', CountriesThatMatch(el));
        });
      } else {
        response.map(el => {
          countryInfoEl.insertAdjacentHTML('beforeend', CountryInfo(el));
        });
      }
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
