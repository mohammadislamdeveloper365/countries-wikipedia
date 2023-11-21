// import { getElementById, createElement } from "./utilities";
loadAllCountries();
searchCountryByName();

function searchCountryByName() {
    const buttonElement = getElementById('country-search-btn');
    buttonElement.addEventListener('click', ()=> {
        const searchField = getElementById('country-name').value;
        loadCountryByName(searchField);
    })
}

function loadAllCountries() {
    const url = 'https://restcountries.com/v3.1/all';

    fetch(url).
    then(response => response.json()).
    then(data => displayAllCountries(data)).catch(error => console.log(error));
}

function displayAllCountries(countries) {
    const parentElement = getElementById('main-container');
    const countriesContainer = createElement('section');
    countriesContainer.id = 'countries-container';
        
    countries.forEach(country=>{
        const countryContainer = createElement('div');
        countryContainer.classList.add('country-container');
        countryContainer.innerHTML = `<p>Name: ${country?.name?.common}</p>
        <p>Capital City: ${country?.capital?.[0] ?? 'No Capital'}</p>
        <p>Continent: ${country?.continents?.[0] ?? 'No Continent'}</p>
        <p>Population: ${country?.population ?? 'Unavailable'}</p>
        <img src='${country.flags?.png ?? "Unavailable"}'/>
        <p>Borders: ${getCountryBorders(country.borders) ?? "No borders available"}</p>
        <p>Currency: ${getCurrencies(country.currencies) ?? "No currency available"}</p>
        `;
        countryContainer.style.backgroundColor = `${getRandomColor()}`;
        countriesContainer.appendChild(countryContainer);
    });
    parentElement.appendChild(countriesContainer);
}

function loadCountryByName(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayCountryByName(data)
    }).catch(error => {
        displayErrorMessage();
        console.log(`No Country Found`)
    });
}

function displayCountryByName(response) {
    const errorElement = getElementById('country-error');
    errorElement.style.display = 'none';
    const parentElement = getElementById('main-container');
    const countriesContainer = getElementById('countries-container');
    countriesContainer.innerHTML = '';
    countriesContainer.id = 'countries-container';

    response.forEach(country => {
        const countryContainer = createElement('div');
        countryContainer.classList.add('country-container');
        countryContainer.innerHTML = `<p>Name: ${country?.name?.common}</p>
        <p>Capital City: ${country?.capital?.[0] ?? 'No Capital'}</p>
        <p>Continent: ${country?.continents?.[0] ?? 'No Continent'}</p>
        <p>Population: ${country?.population ?? 'Unavailable'}</p>
        <img src='${country.flags?.png ?? "Unavailable"}'/>
        <p>Borders: ${getCountryBorders(country.borders) ?? "No borders available"}</p>
        <p>Currency: ${getCurrencies(country.currencies) ?? "No currency available"}</p>
        `;
        countryContainer.style.backgroundColor = `${getRandomColor()}`;
        countriesContainer.appendChild(countryContainer);
    })
    
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

function displayErrorMessage() {
    const errorElement = getElementById('country-error');
    errorElement.style.display = 'block';
}

function getCountryBorders(countryBorders) {
    if(Array.isArray(countryBorders)) {
        return countryBorders.join(' | ');
    } else {
        return null;
    }  
}

function getCurrencies(countryCurrency) {
    for(let currency in countryCurrency) {
        return countryCurrency[currency].name;
    }
}

