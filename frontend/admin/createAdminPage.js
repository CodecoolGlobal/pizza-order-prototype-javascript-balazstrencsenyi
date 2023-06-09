import { createEl } from "../scripts/utils/utils.js";
export function createAdminPage() {
    const newCoffee = createEl("form",{className:"newCoffee" })
    const coffeeName = createEl("input",{className:"coffeeName", placeholder:"Coffee Name", type:"text", name:"name"})
    const coffeeDesc = createEl("textarea", {className:"coffeeDesc", name:"type", placeholder:"Description"})
    const price = createEl("input", {type:"text",placeholder:"Price", className:"price", name:"price"})
    const image = createEl("input", {type:"file", className: "fileInput", name:"fileInput"})
    const button = createEl("button",{innerHTML:"SAVE"})

    const root = document.getElementById("root")
    const backBtn = createEl("button",{innerHTML:"Go Back"})
    const back = createEl("a",{href:"/", className:"admin"})
    
    back.append(backBtn)
    root.append(back)

   
    newCoffee.append(coffeeName,coffeeDesc,price,image,button)

    return newCoffee
}