import { fetchPics } from "./scripts/controllers/fetchPictures.js";
import {
  createHeader,
  createLeftContainer,
  createRightContainer,
} from "./scripts/model/createDom.js";
import { saveData } from "./scripts/controllers/saveData.js";
import { fillCardsData } from "./scripts/model/fillCardsData.js";
import { formHandler } from "./scripts/controllers/formHandler.js";
import { clearCart } from "./scripts/controllers/clearCart.js";

const root = document.querySelector("#root");
function main() {
  root.append(createHeader(), createLeftContainer(), createRightContainer());
}

window.onload = () => {
  main();
  saveData();
  fetchPics();
  fillCardsData();
  formHandler();
  clearCart();
};
