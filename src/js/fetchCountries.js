
import Notiflix from 'notiflix';
import Handlebars from 'handlebars';

export function fetchCountry(name) {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
        if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }).then (response => {
        if(response.length > 10){
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
            return
        } 
        else if (response.length > 2 || response.length <= 10) {
           response.map(el => {
        console.log(el.name.common)
    })
        }
        // response.map((el)=>{
        //     console.log(el.name.official)
        //     console.log(el.capital)
        //     console.log(el.population)
        //     console.log(el.flags.svg)
        //     console.log(el.languages)
        // });
    })
    .catch(err => {
 Notiflix.Notify.failure("Oops, there is no country with that name")
    })
}