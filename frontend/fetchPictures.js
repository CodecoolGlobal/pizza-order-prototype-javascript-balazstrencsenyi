import { getImage } from "./utils.js";

export function fetchPics(){
window.addEventListener("load", async function(){
  const pics = await getImage("/coffees/pictures")
  console.log(pics)
})
}