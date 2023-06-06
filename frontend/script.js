import { fetchPics } from "./fetchPictures.js";
import { createHeader, createLeftContainer, createRightContainer } from "./createDom.js";
import { saveData } from "./saveData.js";
import { formHandler } from "./formHandler.js";
import { fillCardsData } from "./fillCardsData.js";

const root = document.querySelector("#root");
function main() {
  root.append(createHeader(), createLeftContainer());
}

window.onload = () => {
  main();
  saveData();
  fetchPics();
  fillCardsData()
  formHandler()
};
