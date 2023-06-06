import { post } from "./utils.js";
export function saveData() {
  const form = document.querySelector("#form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.querySelector("#input-name").value;
    const newData = {};
    const formElements = Array.from(form.elements);
    for (let element of formElements) {
      if (element.tagName === "INPUT" && element.type !== "submit") {
        newData[element.name] = element.value;
      }
    }

    await post(`/orders/${name}`, newData);
    form.reset();
  });
}
