'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const getCountryData = function (con) {
  const request = new XMLHttpRequest();

  // now we need a url to which we do ajax call , below first we specify like did i need information of i am sendind info with the link to which we are talking

  request.open('GET', `https://restcountries.com/v3.1/name/${con}`);

  // above we specift like what we want with requests

  // now we need to send it

  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const propertyValuesLanguages = Object.values(data.languages);
    const propertyValuesCurrencies = Object.values(data.currencies);

    const lang =
      propertyValuesLanguages.length === 1
        ? propertyValuesLanguages[0]
        : propertyValuesLanguages[1];

    const htmll = `<article class="country">
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

    countriesContainer.insertAdjacentHTML('beforeend', htmll);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('india');
getCountryData('china');
getCountryData('canada');
getCountryData('japan');
