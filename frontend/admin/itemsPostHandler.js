export function itemsPostHandler() {
  const form = document.querySelector(".newCoffee");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const data = new FormData(form);

    const fileInput = form.querySelector(".fileInput"); 
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      data.append("fileInput", file); 
      
    }
    const req = await fetch("/coffee/", {
      method: "POST",
      body: data,
  })
  });
}
