import { createEl } from "./utils.js";


export function createHeader() {
  const header = createEl("header", "header");
  const div =createEl("div", { id: "text"});
  header.append(div);
  return header;
} 


export function createLeftContainer () {
  const leftContainer = createEl("div", { id: "left-container" });

  const card1Container = createEl("div", { id: "card1-container" });
  const card1 = createEl("div", { id: "card1" });
  const input1 = createEl("input", { id: "input1", type: "radio", name: "coffee", value: "1" });

  const card2Container = createEl("div", { id: "card2-container" });
  const card2 = createEl("div", { id: "card2" });
  const input2 = createEl("input", { id: "input2", type: "radio", name: "coffee", value: "2" });

  const card3Container = createEl("div", { id: "card3-container" });
  const card3 = createEl("div", { id: "card3" });
  const input3 = createEl("input", { id: "input3", type: "radio", name: "coffee", value: "3" });

  const card4Container = createEl("div", { id: "card4-container" });
  const card4 = createEl("div", { id: "card4" });
  const input4 = createEl("input", { id: "input4", type: "radio", name: "coffee", value: "4" });

  const card5Container = createEl("div", { id: "card5-container" });
  const card5 = createEl("div", { id: "card5" });
  const input5 = createEl("input", { id: "input5", type: "radio", name: "coffee", value: "5" });

  const card6Container = createEl("div", { id: "card6-container" });
  const card6 = createEl("div", { id: "card6" });
  const input6 = createEl("input", { id: "input6", type: "radio", name: "coffee", value: "6" });  

  const card7Container = createEl("div", { id: "card7-container" });
  const card7 = createEl("div", { id: "card7" });
  const input7 = createEl("input", { id: "input7", type: "radio", name: "coffee", value: "7" });

  card1Container.append(card1, input1);
  card2Container.append(card2, input2);
  card3Container.append(card3, input3);
  card4Container.append(card4, input4);
  card5Container.append(card5, input5);
  card6Container.append(card6, input6);
  card7Container.append(card7, input7);

  leftContainer.append(card1Container, card2Container, card3Container, card4Container, card5Container, card6Container, card7Container);

  return leftContainer;

}

export function createRightContainer() {
  const rightContainer = createEl("div", { id: "right-container"});
  const form = createEl("form", { id: "form"});
  const inputName = createEl("input", { id: "input-name", type: "text", placeholder: "Enter your name"});
  const inputZip = createEl("input", { id: "input-zip", type: "text", placeholder: "Enter your zip code"});
  const inputCity = createEl("input", { id: "input-city", type: "text", placeholder: "Enter your city"});
  const inputStreet = createEl("input", { id: "input-street", type: "text", placeholder: "Enter your street"});
  const inputHouseNumber = createEl("input", { id: "input-number", type: "text", placeholder: "Enter your House number"});
  const inputEmail = createEl("input", { id: "input-email", type: "text", placeholder: "Enter your email"});
  const inputPhone = createEl("input", { id: "input-phone", type: "text", placeholder: "Enter your phone number"});

  const button = createEl("button", { id: "button", type: "submit", textContent: "Send"});

  form.append(inputName, inputZip, inputCity, inputStreet, inputHouseNumber, inputEmail, inputPhone, button);

  rightContainer.append(form);

  return rightContainer;
}


