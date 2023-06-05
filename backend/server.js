const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const FE_FS_PATH = path.join(__dirname, '..', 'frontend');
const ordersFilePath = path.join(__dirname, "../backend/orders.json");
const coffeePicturesDir = path.join(__dirname, '/media');

app.use(express.static(FE_FS_PATH));
app.use(express.json());

//megrendelők mentése
app.post("/orders/:name", (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const jsonData = req.body;

  fs.readFile(ordersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error can't save");
    }

    let customers = [];
    if (data) {
      customers = JSON.parse(data);
    }

    const existingCustomer = customers.find(
      (customer) => customer.name === name
    );
    if (existingCustomer) {
      return res.status(400).send("Customer already ordered");
    }

    const maxId = Math.max(...customers.map((customer) => customer.id), 0);
    const newCustomer = {
      id: maxId + 1,
      name: name,
      status: true,
      data: jsonData 
    };

    customers.push(newCustomer);

    const updatedData = JSON.stringify(customers, null, 2);

    const newFileName = `customer_${newCustomer.id}.json`;
    const newFilePath = path.join(__dirname, "orders", newFileName);

    fs.writeFile(newFilePath, JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error can't save");
      }

      fs.writeFile(ordersFilePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error can't save");
        }

        res.send("Saved");
      });
    });
  });
});

app.get("/orders", (req, res) => {
  fs.readdir("orders", (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving orders");
    }

    const orders = [];
    files.forEach((file) => {
      const filePath = path.join(__dirname, "orders", file);
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

app.get("/coffees/pictures", (req, res) => {
  fs.readdir(coffeePicturesDir, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error retrieving coffee pictures");
    }

    const pictures = [];
    files.forEach((file) => {
      const filePath = path.join(coffeePicturesDir, file);
      pictures.push(filePath);
    });

    res.json(pictures);
  });
});

 

/*fs.writeFile('coffees.json', JSON.stringify(data, replacer, 2), (err) => {
  if (err) {
    console.error(err);
    res.status(500).send('Error saving profile data');
  } else {
    res.sendStatus(200);
  }
}); */

/* app.delete('/deleteCoffees', (req, res) => {
  fs.unlink('coffees.json', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error deleting profile');
    } else {
      res.sendStatus(200);
    }
  });
}); */

app.listen(PORT, ()=>{
  console.log("http://localhost:3000/")
})
