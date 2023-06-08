import { createRightContainer } from "../model/createDom.js";
export function formHandler() {
  const buttons = document.querySelectorAll(".add");

  for (const button of buttons) {
    button.addEventListener("click", () => {
      const parentDiv = button.parentElement;
      const grandparentDiv = parentDiv.parentElement;

      const h1 = grandparentDiv.querySelector("h1");
      const h6 = grandparentDiv.querySelector("h6");
      const amount = grandparentDiv.querySelector("input");

      const clonedH1 = h1.cloneNode(true);
      clonedH1.name = "name";
      clonedH1.id = "input-type";
      const clonedH6 = h6.cloneNode(true);
      clonedH6.name = "Piece & price";
      clonedH6.id = "input-price";
      const orderCon = document.querySelector("#orderCon");
      orderCon.classList.remove("orderCon")
      orderCon.classList.add("newOrderCon")

      if (amount.value) {
        const amountValue = parseInt(amount.value);
        const result = parseInt(clonedH6.textContent) * amountValue;
        clonedH6.innerHTML =
          "Amount: " +
          amountValue +
          " piece<br>" +
          "Total price " +
          result +
          "$";
      }
      orderCon.append(clonedH1, clonedH6);
    });
  }
}
