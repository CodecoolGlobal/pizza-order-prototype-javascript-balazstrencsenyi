import { createEl } from "./utils.js";

export function createHeader() {
  const header = createEl("header", "header");
  const div = createEl("div", { id: "text", textContent: "Coffee Shop" });
  const logo = createEl("img", { classList: "logo", src: "./logo.png" })
  div.prepend(logo)
  header.append(div);
  return header;
}

export function createLeftContainer() {
  const leftContainer = createEl("div", { id: "left-container" });

  const card1Container = createEl("div", {
    id: "card1-container",
    class: "card",
  });
  const img1 = createEl("img", { id: "img1", src: "/coffees/pictures/1.jpg" });
  const container1 = createEl("div", { id: "container1" });
  const input1 = createEl("input", {
    id: "input1",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button1 = createEl("button", {
    className: "add",
    id: "button1",
    type: "submit",
    textContent: "Add to cart",
  });
  container1.append(input1, button1);

  const card2Container = createEl("div", {
    id: "card2-container",
    class: "card",
  });
  const img2 = createEl("img", { id: "img2", src: "/coffees/pictures/2.jpg" });
  const container2 = createEl("div", { id: "container2" });
  const input2 = createEl("input", {
    id: "input2",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button2 = createEl("button", {
    className: "add",
    id: "button2",
    type: "submit",
    textContent: "Add to cart",
  });
  container2.append(input2, button2);

  const card3Container = createEl("div", {
    id: "card3-container",
    class: "card",
  });
  const img3 = createEl("img", { id: "img3", src: "/coffees/pictures/3.jpg" });
  const container3 = createEl("div", { id: "container3" });
  const input3 = createEl("input", {
    id: "input3",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button3 = createEl("button", {
    className: "add",
    id: "button3",
    type: "submit",
    textContent: "Add to cart",
  });
  container3.append(input3, button3);

  const card4Container = createEl("div", {
    id: "card4-container",
    class: "card",
  });
  const img4 = createEl("img", { id: "img4", src: "/coffees/pictures/4.jpg" });
  const container4 = createEl("div", { id: "container4" });
  const input4 = createEl("input", {
    id: "input4",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button4 = createEl("button", {
    className: "add",
    id: "button4",
    type: "submit",
    textContent: "Add to cart",
  });
  container4.append(input4, button4);

  const card5Container = createEl("div", {
    id: "card5-container",
    class: "card",
  });
  const img5 = createEl("img", { id: "img5", src: "/coffees/pictures/5.jpg" });
  const container5 = createEl("div", { id: "container5" });
  const input5 = createEl("input", {
    id: "input5",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button5 = createEl("button", {
    className: "add",
    id: "button5",
    type: "submit",
    textContent: "Add to cart",
  });
  container5.append(input5, button5);

  const card6Container = createEl("div", {
    id: "card6-container",
    class: "card",
  });
  const img6 = createEl("img", { id: "img6", src: "/coffees/pictures/6.jpg" });
  const container6 = createEl("div", { id: "container6" });
  const input6 = createEl("input", {
    id: "input6",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button6 = createEl("button", {
    className: "add",
    id: "button6",
    type: "submit",
    textContent: "Add to cart",
  });
  container6.append(input6, button6);

  const card7Container = createEl("div", {
    id: "card7-container",
    class: "card",
  });
  const img7 = createEl("img", { id: "img7", src: "/coffees/pictures/7.jpg" });
  const container7 = createEl("div", { id: "container7" });
  const input7 = createEl("input", {
    id: "input7",
    type: "number",
    name: "coffee",
    placeholder: "Enter the amount",
  });
  const button7 = createEl("button", {
    className: "add",
    id: "button7",
    type: "submit",
    textContent: "Add to cart",
  });
  container7.append(input7, button7);

  card1Container.append(img1, container1);
  card2Container.append(img2, container2);
  card3Container.append(img3, container3);
  card4Container.append(img4, container4);
  card5Container.append(img5, container5);
  card6Container.append(img6, container6);
  card7Container.append(img7, container7);

  leftContainer.append(
    card1Container,
    card2Container,
    card3Container,
    card4Container,
    card5Container,
    card6Container,
    card7Container
  );

  return leftContainer;
}

export function createRightContainer() {
  const rightContainer = createEl("div", { id: "right-container" });
  const form = createEl("form", { id: "form" });

  const cartCon = createEl("div", {className: "cartCon"})
  cartCon.innerHTML = "<h2>Cart:</h2>"

  const orderCon = document.createElement("div")
  orderCon.classList = "orderCon"

  const trash = createEl("img", {className:"trash", src:"./trash.png"})

  const cart = document.createElement("img")
  cart.src = "./cart.png"
  cart.classList = "cart"

  cartCon.append(trash, cart)


  const labelname = createEl("label", {
    id: "label-name",
    textContent: "Name:",
  });
  const inputName = createEl("input", {
    id: "input-name",
    type: "text",
    placeholder: "Enter your name",
    name: "FullName",
  });
  const labelZip = createEl("label", {
    id: "label-zip",
    textContent: "Zip Code:",
  });
  const inputZip = createEl("input", {
    id: "input-zip",
    type: "text",
    placeholder: "Enter your zip code",
    name: "Zip-Code",
  });
  const labelCity = createEl("label", {
    id: "label-city",
    textContent: "City:",
  });
  const inputCity = createEl("input", {
    id: "input-city",
    type: "text",
    placeholder: "Enter your city",
    name: "City",
  });
  const labelStreet = createEl("label", {
    id: "label-street",
    textContent: "Street:",
  });
  const inputStreet = createEl("input", {
    id: "input-street",
    type: "text",
    placeholder: "Enter your street",
    name: "street",
  });
  const labelHouseNumber = createEl("label", {
    id: "label-number",
    textContent: "House Number:",
  });
  const inputHouseNumber = createEl("input", {
    id: "input-number",
    type: "text",
    placeholder: "Enter your House number",
    name: "Number",
  });
  const labelEmail = createEl("label", {
    id: "label-email",
    textContent: "Email:",
  });
  const inputEmail = createEl("input", {
    id: "input-email",
    type: "text",
    placeholder: "Enter your email",
    name: "e-mail",
  });
  const labelPhone = createEl("label", {
    id: "label-phone",
    textContent: "Phone Number:",
  });
  const inputPhone = createEl("input", {
    id: "input-phone",
    type: "text",
    placeholder: "Enter your phone number",
    name: "Phone",
  });

  const button = createEl("button", { id: "submit", textContent: "Send Your Order" });

  form.append(
    cartCon,
    orderCon,
    labelname,
    inputName,
    labelZip,
    inputZip,
    labelCity,
    inputCity,
    labelStreet,
    inputStreet,
    labelHouseNumber,
    inputHouseNumber,
    labelEmail,
    inputEmail,
    labelPhone,
    inputPhone,
    button
  );

  rightContainer.append(form);

  return rightContainer;
}
