'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
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

/*
Implementation of neighbors how to overcome the callback hell here see
rememeber one thing what a then method return is always a fullfill value.
i will add ss to it below.

*/

const addContry = function (con) {
  fetch(`https://restcountries.com/v3.1/name/${con}`)
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);
      renderCountry(data[0]);
      const noOfNeighbors = data[0].borders.length;
      if (!noOfNeighbors) return;
      const random = Math.floor(Math.random() * noOfNeighbors);

      const neighbor = data[0].borders[random];
      console.log(neighbor);
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};

addContry('pakistan');
