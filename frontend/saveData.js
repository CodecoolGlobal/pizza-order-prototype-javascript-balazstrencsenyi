import { post } from "./utils.js";

export function saveData() {
  const form = document.querySelector("#form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.querySelector("#input-name").value;
    const newData = {};

    // Űrlapban lévő elemek gyűjtése
    const formElements = Array.from(form.elements);
    for (let element of formElements) {
      if (element.tagName === "INPUT" && element.type !== "submit") {
        newData[element.name] = element.value;
      }
    }

    // Újonnan hozzáadott elemek hozzáadása
    const h1 = document.querySelector("#input-type");
    const h6 = document.querySelector("#input-price");

    newData["h1"] = h1.textContent;
    newData["h6"] = h6.textContent;

    await post(`/orders/${name}`, newData);
    form.reset();
  });
}
