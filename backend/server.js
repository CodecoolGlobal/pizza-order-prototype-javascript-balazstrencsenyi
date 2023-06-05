const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const upload = require('express-fileupload')

const FE_FS_PATH = path.join(__dirname, '..', 'frontend');
const ordersFilePath = path.join(__dirname, "data");
const coffeePicturesDir = path.join(__dirname, 'media');

app.use(express.static(FE_FS_PATH));
app.use(express.json());

// Megrendelők mentése

let currentMaxId = 0; 
app.post("/orders/", (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).send("Hiányzó űrlap adatok");
  }

  currentMaxId++; 

  const customerData = {
    id: currentMaxId,
    formData: formData
  };

  const newFileName = `customer_${currentMaxId}.json`;
  const newFilePath = path.join(__dirname, "data", newFileName);

  const allData = {
    customerData: customerData,
    allFormData: formData
  };

  fs.writeFile(newFilePath, JSON.stringify(allData, null, 2), "utf8", (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Hiba: nem sikerült menteni");
    }

    return res.send("Mentve");
  });
});




app.get("/orders", (req, res) => {
  fs.readdir(ordersFilePath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving orders");
    }

    const orders = [];
    files.forEach((file) => {
      const filePath = path.join(ordersFilePath, file);
      const orderData = fs.readFileSync(filePath, "utf8");
      const order = JSON.parse(orderData);
      orders.push(order);
    });

    res.json(orders);
  });
});

app.get("/coffees", (req, res) => {
  fs.readFile("coffees.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving coffees");
    }

    const coffees = JSON.parse(data);
    res.json(coffees);
  });
});

app.get("/coffees/pictures/:filename", async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(coffeePicturesDir, filename);

  try {
    const imageBlob = await fs.promises.readFile(filePath);
    res.setHeader("Content-Type", "image/jpeg");
    res.send(imageBlob);
  } catch (err) {
    console.error(err);
    res.status(404).send("File not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
