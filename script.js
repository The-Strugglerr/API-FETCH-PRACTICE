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
using fetch methods it will immediately return a promise and in beginning this promsise will be stilll pending and at some point this promise will get settle , it it will be fulfilled then it will return something and that response we handle with then method, it is only take one parameter that is the response from fetch method.in this response we have a body property in which we have all the data so to acces it we need to use another method called json but above is problem this json is also asynchronous function so it will also return a promise so we need to return it and then call again a then method.
*/

// const addContry = function (con) {
//   fetch(`https://restcountries.com/v3.1/name/${con}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

// lets use arrow function to simplfy above

const addContry = function (con) {
  fetch(`https://restcountries.com/v3.1/name/${con}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

addContry('india');
