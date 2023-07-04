'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const addContry = function (data, className = '') {
  const propertyValuesLanguages = Object.values(data.languages);
  const propertyValuesCurrencies = Object.values(data.currencies);

  const lang =
    propertyValuesLanguages.length === 1
      ? propertyValuesLanguages[0]
      : propertyValuesLanguages[1];

  const html = `<article class="country ${className}  ">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} Million people</p>
    <p class="country__row"><span>🗣️</span>${lang}</p>
    <p class="country__row"><span>💰</span>${
      propertyValuesCurrencies[0].name
    }</p>
  </div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (con) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${con}`);
  request.send();
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //first country
    addContry(data);

    // neighbouring country
    const [neighbour] = data.borders;

    if (!neighbour) return;
    const request1 = new XMLHttpRequest();
    request1.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request1.send();
    request1.addEventListener('load', function () {
      const [data1] = JSON.parse(this.responseText);
      console.log(data1);
      addContry(data1, 'neighbour');
    });
  });
};

getCountryAndNeighbour('india');
