const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const FE_FS_PATH = path.join(__dirname, '..', 'frontend');
const costumersFilePath = path.join(__dirname, "../backend/costumer.json");

app.use(express.static(FE_FS_PATH));
app.use(express.json());

//megrendelők mentése
app.post("/customer/:name", (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const jsonData = req.body;

  fs.readFile(costumersFilePath, "utf8", (err, data) => {
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
      data: jsonData // Az új ügyfélhez hozzáadja a JSON adatot
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

      fs.writeFile(costumersFilePath, updatedData, "utf8", (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error can't save");
        }

        res.send("Saved");
      });
    });
  });
});

app.get("/costumer", (req, res)=>{
  
})

app.get("/coffees/", (req, res)=>{
//TODO
})
app.get("/coffees/pictures", (req, res)=>{
//TODO
})
 

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
