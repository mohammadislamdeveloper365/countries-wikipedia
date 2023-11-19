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
        `;
        countryContainer.style.backgroundColor = `${getRandomColor()}`;
        countriesContainer.appendChild(countryContainer);
    });
    parentElement.appendChild(countriesContainer);
}

function loadCountryByName(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    
    fetch(url).
    then(response => response.json()).
    then(data => {
        console.log(data);
        displayCountryByName(data)
    }).
    catch(error => {
        console.log("No Country Found" + error)
    });
}

function displayCountryByName(country) {
    const parentElement = getElementById('main-container');
    const countriesContainer = getElementById('countries-container');
    countriesContainer.innerHTML = '';
    countriesContainer.id = 'countries-container';
    const countryContainer = createElement('div');
    countryContainer.classList.add('country-container');
    countryContainer.innerHTML = `<p>Name: ${country[0]?.name?.common}</p>
        <p>Capital City: ${country[0]?.capital?.[0] ?? 'No Capital'}</p>
        <p>Continent: ${country[0]?.continents?.[0] ?? 'No Continent'}</p>
        <p>Population: ${country[0]?.population ?? 'Unavailable'}</p>
        <img src='${country[0].flags?.png ?? "Unavailable"}'/>
        `;
    countryContainer.style.backgroundColor = `${getRandomColor()}`;
    countriesContainer.appendChild(countryContainer);
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