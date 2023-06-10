import { get, createEl } from "../utils/utils.js";
import { formHandler } from "../controllers/formHandler.js";
import { refreshAmInput } from "../controllers/refreshAmInput.js";


export async function fillCardsData() {
  const leftContainer = document.querySelector("#left-container");
  const data = await get("/coffees");

  data.forEach((item, index) => {
    const cardContainer = createEl("div", {
      id: `card${index + 1}-container`,
      class: "card",
    });
    const img = createEl("img", {
      id: `img${index + 1}`,
      src: `/coffees/pictures/${index + 1}.jpg`,
    });
    const container = createEl("div", { id: `container${index + 1}` });
    const input = createEl("input", {
      id: `input${index + 1}`,
      type: "number",
      name: "coffee",
      placeholder: "Amount",
    });
    const button = createEl("button", {
      className: "add",
      id: `button${index + 1}`,
      type: "submit",
      textContent: "Add to cart",
    });
    const h1 = createEl("h1", { textContent: item.name });
    const h5 = createEl("h5", { textContent: item.type });
    const h6 = createEl("h6", { textContent: item.price });

    container.append(h6, input, button);
    cardContainer.append(img, container);
    cardContainer.prepend(h1, h5)
    leftContainer.appendChild(cardContainer);
  });
  formHandler()
  refreshAmInput()
}

