import Notiflix from 'notiflix';
import CountriesThatMatch from '../handlebars/listItems.hbs';
import CountryInfo from '../handlebars/countryInfo.hbs';

const listOfCountriesEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

export function fetchCountry(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(response => {
      if (response.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        return;
      } else if (response.length > 2 && response.length <= 10) {
        response.forEach(el => {
          listOfCountriesEl.insertAdjacentHTML('beforeend', CountriesThatMatch(el));
          // document.querySelector('.country').addEventListener('click', () => {
          //   document.querySelector('#search-box').value = el.name.common;
          // });
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
