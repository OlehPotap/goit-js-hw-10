const listOfCountriesEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

export function fetchCountry(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}
