
import { fetchPics } from "./fetchPictures.js"
import { createHeader, createLeftContainer, createRightContainer } from "./createDom.js"

const root = document.querySelector('#root')
function main(){
 const header = createHeader() 
 const leftContainer = createLeftContainer()
 const rightContainer = createRightContainer()
 /*fetchPics() gives err message*/
 root.append(header, leftContainer, rightContainer)
}

window.onload = () => {
  main();

};
