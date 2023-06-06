import { get } from "./utils.js";

export async function fillCardsData() {
  const upCon1 = document.querySelector("#card1-container");
  const upCon2 = document.querySelector("#card2-container");
  const upCon3 = document.querySelector("#card3-container");
  const upCon4 = document.querySelector("#card4-container");
  const upCon5 = document.querySelector("#card5-container");
  const upCon6 = document.querySelector("#card6-container");
  const upCon7 = document.querySelector("#card7-container");
  const container1 = document.querySelector("#container1");
  const container2 = document.querySelector("#container2");
  const container3 = document.querySelector("#container3");
  const container4 = document.querySelector("#container4");
  const container5 = document.querySelector("#container5");
  const container6 = document.querySelector("#container6");
  const container7 = document.querySelector("#container7");

  const data = await get("/coffees");

  data.forEach((item, index) => {
    const h1 = document.createElement("h1");
    h1.innerHTML = item.name;
    const h5 = document.createElement("h5");
    h5.innerHTML = item.type;
    const h6 = document.createElement("h6");
    h6.innerHTML = item.price;

    const upCon = eval(`upCon${index + 1}`);
    const container = eval(`container${index + 1}`)

    upCon.prepend(h1, h5);
    container.prepend(h6);
  });
}
