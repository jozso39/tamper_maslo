// ==UserScript==
// @name         Máslo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  amažte ho na rohlík a hned bude lépe stravitelný! Máslo zjednodušuje testování rohlíku.cz a jeho testovacích prostředí pomocí univerzálních klávesových zkratek.
// @author       Jožin Čambora
// @include      *.rohlik.cz*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  //define vars
  let baseUrl;

  const defaultUser = `happywhatever@email.cz`;
  const defaultPassword = `MasloNaRohlik`;

  //FUNCTIONS
  //check if URL is saved in cache
  function checkSavedUrl() {
    if (!localStorage.getItem(`maslo.baseUrl`)) {
      baseUrl = prompt(
        `Zadej URL stránky kterou chceš testovat. Uloží se chrome storage cache pro další použití.\n\nVzor: https://www.rohlik.cz\n\nVymazáním cache prohlížeče se uložené URL vymaže`,
        `https://www.rohlik.cz`
      );

      localStorage.setItem(`maslo.baseUrl`, baseUrl);
      console.log(`butter 🧈: base URL saved to storage - ${baseUrl}`);
    } else {
      baseUrl = localStorage.getItem(`maslo.baseUrl`);
      console.log(`butter 🧈: getting saved base URL from browser cache.`);
      console.log(`butter 🧈: if you want to use a new URL, delete your browsing data`);
    }
  }

  //turns of validations, fixes various FE problems
  function triggerValidations(field, events) {
    //pokud events je array, projeď každý zvlášť
    if (typeof events == `object`) {
      for (var i = 0; i < events.length; i++) {
        field.dispatchEvent(
          new Event(events[i], {
            bubbles: true,
          })
        );
      }
    } else if (typeof events == `string`) {
      field.dispatchEvent(
        new Event(events, {
          bubbles: true,
        })
      );
    }
  }

  //PŘI STISKNUTÍ
  document.onkeyup = function (e) {
    /////////////
    //CTRL+ALT+L - login as happywhatever@email.cz
    /////////////
    if (e.ctrlKey && e.altKey && e.which == 76) {
      checkSavedUrl();
      console.log(`butter 🧈: CTRL+ALT+L pressed - Login started`);

      //fetch pro login
      fetch(`${baseUrl}/services/frontend-service/login`, {
        credentials: "include",
        headers: {
          accept: "*/*",
          "accept-language": "cs",
          "content-type": "application/json",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-origin": "WEB",
        },
        referrerPolicy: "no-referrer-when-downgrade",
        body: `{"email":"${defaultUser}","password":"${defaultPassword}"}`,
        method: "POST",
        mode: "cors",
      }).then(() => {
        location.reload();
      });

      /////////////
      //CTRL+ALT+O - logout user
      /////////////
    } else if (e.ctrlKey && e.altKey && e.which == 79) {
      checkSavedUrl();
      console.log(`butter 🧈: CTRL+ALT+O pressed - user logged out`);
      fetch(`${baseUrl}/services/frontend-service/logout`, {
        credentials: "include",
        headers: {
          accept: "*/*",
          "accept-language": "cs",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-origin": "WEB",
        },
        referrerPolicy: "no-referrer-when-downgrade",
        body: null,
        method: "POST",
        mode: "cors",
      }).then(() => {
        location.reload();
      });

      /////////////
      //CTRL+ALT+N - fill new user data (or redirect to registration)
      /////////////
    } else if (e.ctrlKey && e.altKey && e.which == 78) {
      checkSavedUrl();

      //check if logged in
      if (document.querySelector(`#headerUser`)) {
        alert(`Nejprv se musíš odhlásit než se chceš znova registrovat ty housko.\nZmáčkni CTRL+ALT+O`);

        //check if on right page
      } else if (!document.location.href.includes(`/uzivatel/registrace`)) {
        window.top.open(`${baseUrl}/uzivatel/registrace`, `_self`);

        //fill in data
      } else {
        //set fields
        let nameField = document.querySelector(`#name`);
        let phoneField = document.querySelector(`#phoneNumber`);
        let emailField = document.querySelector(`#email`);
        let passwordField = document.querySelector(`#password`);
        let consentCheckbox = document.querySelector(`input#consent`);

        //generate data
        const genName =
          `Butter M` +
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, ``) +
          `ová`;
        const genPhoneNumber = `777` + Math.floor(100000 + Math.random() * 900000);
        const genEmail = `vaj` + Math.floor(100000 + Math.random() * 900000) + `@butter.cz`;

        //fill fields with generated data
        nameField.value = genName;
        phoneField.value = genPhoneNumber;
        emailField.value = genEmail;
        passwordField.value = `hadejTrikrat123`;
        consentCheckbox.checked = true;

        //trigger validations
        triggerValidations(nameField, [`click`, `change`, `blur`]);
        triggerValidations(emailField, [`click`, `change`, `blur`]);
        triggerValidations(phoneField, [`click`, `change`, `blur`]);
        triggerValidations(passwordField, [`click`, `change`, `blur`]);
      }
      /////////////
      //CTRL+ALT+M - najdi máslo
      /////////////
    } else if (e.ctrlKey && e.altKey && e.which == 77) {
      checkSavedUrl();
      window.top.open(`${baseUrl}/c300105049-maslo`, `_self`);

      /////////////
      //CTRL+ALT+F2 - show tooltip
      /////////////
    } else if (e.ctrlKey && e.altKey && e.which == 113) {
      alert(
        `--- : NÁPOVĚDA : ---\n` +
          `!!Musíš mít focus na stránce aby fungovaly zkratky!!\n` +
          `\n` +
          `CTRL+ALT+N - přesun na stránku registrace, generování a vyplnění dat\n` +
          `CTRL+ALT+L - login jako happywhatever@email.cz\n` +
          `CTRL+ALT+O - odhlášení\n` +
          `CTRL+ALT+M - najdi máslo\n` +
          `\n` +
          `made by Jožin`
      );
    }
  };
})();
