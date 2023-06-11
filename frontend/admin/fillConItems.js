import { get,createEl } from "../scripts/utils/utils.js";
import { removeBtnHandler } from "./removeBtnHandler.js";
export async function fillContent() {
    const avProdListCon = document.querySelector(".avProdListCon");
    avProdListCon.innerHTML = ""
    const availableIds = await get("/coffees/availableIds");
  
    const data = await get("/coffees");
  
    availableIds.forEach((id, index) => {
      const coffee = data.find((item) => item.id === id);
  
      const cardContainer = createEl("div", {
        id: `card${index + 1}-container`,
        class: "card",
      });
      const img = createEl("img", {
        id: `img${index + 1}`,
        src: `/coffees/pictures/${id}.jpg`,
      });
      const container = createEl("div", { id: `container${index + 1}` });
      const button = createEl("button", {
        className: "remove",
        id: `button${index + 1}`,
        type: "submit",
        textContent: "Remove",
      });
      const name = createEl("p", { textContent: coffee.name });
      const price = createEl("p", { textContent: coffee.price });
      const ids = createEl("p",{className: "ids",textContent: "id: "+coffee.id})
  
      container.append(price, ids, button);
      cardContainer.append(img, container);
      cardContainer.prepend(name);
      avProdListCon.append(cardContainer);
      const root = document.querySelector("#root")
      root.append(avProdListCon)
    });
    removeBtnHandler()
}