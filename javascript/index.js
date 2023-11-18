// import { getElementById, createElement } from "./utilities";
loadAllCountries();


function loadAllCountries() {
    const url = 'https://restcountries.com/v3.1/all';

    fetch(url).
    then(response => response.json()).
    then(data => {
        console.log(data)
        displayAllCountries(data)
    });
}

function displayAllCountries(countries) {
    const parentElement = getElementById('main-container');
    const countriesContainer = createElement('section');
    countriesContainer.id = 'countries-container';
        
    countries.forEach(country=>{
        const countryContainer = createElement('div');
        countryContainer.classList.add('country-container');
        countryContainer.innerHTML = `
        <p>Name: ${country?.name?.common}<p>
        <p>Capital City: ${country?.capital?.[0] ?? 'No Capital'}</p>
        <p>Continent: ${country?.continents?.[0] ?? 'No Continent'}</p>
        <p>Population: ${country?.population ?? 'Unavailable'}</p>
        <img src='${country.flags?.png ?? "Unavailable"}'/>
        `;
        countryContainer.style.backgroundColor = `${getRandomColor()}`;
        countriesContainer.appendChild(countryContainer);
    });
    parentElement.appendChild(countriesContainer);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    color += 80;
    if (color === '#FFFFFF80') {
        color = '#000080'
    }

    return color;
}