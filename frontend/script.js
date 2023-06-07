import { fetchPics } from "./controllers/fetchPictures.js";
import {
  createHeader,
  createLeftContainer,
  createRightContainer,
} from "./model/createDom.js";
import { saveData } from "./controllers/saveData.js";
import { fillCardsData } from "./model/fillCardsData.js";
import { formHandler } from "./controllers/formHandler.js";
import { clearCart } from "./controllers/clearCart.js";

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
