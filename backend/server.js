const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;
const upload = require("express-fileupload");

const FE_FS_PATH = path.join(__dirname, "..", "frontend");
const ordersFilePath = path.join(__dirname, "data");
const coffeePicturesDir = path.join(__dirname, "media");
const loginPath = path.join(__dirname,"admin.json")
const coffeePath = "./coffees.json";

app.use(express.static(FE_FS_PATH));
app.use(express.json());
app.use(upload());

app.get("/admin", (req, res) => {
  const adminHTML = `
    <html>
    <head>
      <title>Admin</title>
      <script src="/admin/adminMain.js" type="module" defer></script>
      <link rel="stylesheet" href="/admin/admin.css">
    </head>
    <body>
      <div id="root"></div>
    </body>
    </html>`;
  res.send(adminHTML);
});

app.post("/login", (req, res) => {
  const logInData = req.body;

  if (!logInData) {
    return res.status(400).send("Please Log In!");
  }

  fs.readFile(loginPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Bad request!");
    }

    const userData = JSON.parse(data);

    if (
      userData.username === logInData.username &&
      userData.password === logInData.pw
    ) {
      return res.sendStatus(202);
    }

    return res.sendStatus(401);
  });
});


const coffee = {
"id": 1,
"name": "Breve Coffee",
"type": "A breve, also known as a breve latte or a caffe breve, is an espresso based coffee drink.",
"price": "2 $"
}

app.post("/coffee/", (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).send("Missing form data.");
  }

  fs.readFile(path.join(__dirname, coffeePath), "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error: Unable to read file.");
    }

    const coffees = JSON.parse(data);

    let currentMaxId = 0;

    if (coffees.length > 0) {
      coffees.forEach((coffee) => {
        if (coffee.id > currentMaxId) {
          currentMaxId = coffee.id;
        }
      });
    }

    currentMaxId++;

    const coffeeData = {
      id: currentMaxId,
      ...formData,
    };

    coffees.push(coffeeData);

    fs.writeFile(
      path.join(__dirname, coffeePath),
      JSON.stringify(coffees, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error: Unable to write file.");
        }

        const fileInput = req.files.fileInput;
        const fileName = `${currentMaxId}.jpg`;
        const filePath = path.join(coffeePicturesDir, fileName);

        fileInput.mv(filePath, (err) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Error: Unable to move file.");
          }

          return res.sendStatus(200);
        });
      }
    );
  });
});



app.post("/orders/", (req, res) => {
  const formData = req.body;

  const date = new Date();

  if (!formData) {
    return res.status(400).send("Missing form data.");
  }

  fs.readdir(path.join(__dirname, "data"), (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error: Unable to read directory.");
    }

    let currentMaxId = 0;

    if (files.length > 0) {
      files.forEach((file) => {
        const id = parseInt(file.split("_")[1].split(".")[0]);
        if (id > currentMaxId) {
          currentMaxId = id;
        }
      });
    }

    currentMaxId++;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDate = `${year}y${month}m${day}d${hours}h${minutes}m`;
    const fileName = `${formattedDate}_${currentMaxId}.json`;
    const newFilePath = path.join(__dirname, "data", fileName);

    const customerData = {
      id: currentMaxId,
      date: formattedDate,
      formData: formData,
    };

    fs.writeFile(
      newFilePath,
      JSON.stringify(customerData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error: Unable to save file.");
        }

        return res.send("Saved");
      }
    );
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
