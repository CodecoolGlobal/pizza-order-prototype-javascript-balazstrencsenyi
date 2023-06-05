export function createEl(tag, options) {
  const el = document.createElement(tag);

  if (!options) {
    return el;
  }

  for (const entry of Object.entries(options)) {
    const [key, value] = entry; 
    el[key] = value;
  }

  return el;
}


//coffee object get
export async function get(url){
  const res = await fetch(url)
  const data = await res.json()
  return data
}

//coffee pics blob(download)
export async function getImage(url) {
  const response = await fetch(url);
  const imageBlob = await response.blob();
  return URL.createObjectURL(imageBlob);
}

//orders post
export async function post(url, formData) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  });
  return response;
}


