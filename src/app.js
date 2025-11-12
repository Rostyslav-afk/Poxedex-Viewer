//PLUGINS IMPORTS
import {
  defaultModules,
  error,
} from "../node_modules/@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "../node_modules/@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/core/dist/BrightTheme.css";
defaultModules.set(PNotifyMobile, {});

//CASTOM IMPORTS
import getPokeInfo from "./getPokeInfo";
import debounce from "lodash.debounce";

//APP
const appInput = document.querySelector(".app-input");
const appCardSpace = document.querySelector(".app-card-space");

appInput.addEventListener("input", debounce(searchPokeFunc, 500));

function searchPokeFunc(evt) {
  const pokeName = evt.target.value.trim();
  appCardSpace.innerHTML = "";

  getPokeInfo(pokeName).then((res) => {
    // id - ід, sprites.other["official-artwork"].front_default - фото, name - ім'я, abilities - абілки, stats - статистика
    if (!res) return;

    const { id, name, abilities, stats, sprites } = res;

    const abilitiesArray = Object.values(abilities);
    const statsArray = Object.values(stats);

    console.log(abilitiesArray);

    appCardSpace.innerHTML = `
         <div class="app-card">
                <div class="card-text_info">
                    <h1 class="card-title">${capitalizeFirstLetter(name)}</h1>
                    <h2 class="card-subtitle">Id: ${id}</h2>
                    <h2 class="card-subtitle_abilities">Abilities:</h2>
                    <ul class="card-list_abilities">
                      ${abilitiesArray
                        .map(
                          ({
                            ability,
                            is_hidden,
                          }) => `<li class="card-list_abilities-item">
                            <h3 class="card-list_abilities-subtitle">Ability:
                                ${ability}</h3>
                            <h3 class="card-list_abilities-subtitle">Is hidden:
                                ${is_hidden}</h3>
                        </li>`
                        )
                        .join("")}
                    </ul>
                    <h2 class="card-subtitle_stats">Stats:</h2>
                    <ul class="card-list_stats">
                    </ul>
                </div>
                <div class="card-image_info">
                    <img
                        src="#"
                        alt="Pokemon Image!" class="card-image" width="350"
                        height="400">
                </div>
            </div>
    `;
  });
}

function errorFunction() {
  error({
    title: "Oh No!",
    text: "We didn't find such a Pokemon :(",
    delay: 2500,
  });
}

function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}
