'use ctrict';
import './css/styles.css';
import { fetchCountry } from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const serchBoxEl = document.querySelector('#search-box');

function callSerchCountries(event) {
  document.querySelector('.country-info').innerHTML = '';
  document.querySelector('.country-list').innerHTML = '';
  fetchCountry(event.target.value.trim());
}

serchBoxEl.addEventListener('input', debounce(callSerchCountries, DEBOUNCE_DELAY));
