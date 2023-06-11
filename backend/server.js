const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;
const upload = require("express-fileupload");

const FE_FS_PATH = path.join(__dirname, "..", "frontend");
const ordersFilePath = path.join(__dirname, "data");
const coffeePicturesDir = path.join(__dirname, "media");
const loginPath = path.join(__dirname, "admin.json");
const coffeesFilePath = "./coffees.json";

app.use(express.static(FE_FS_PATH));
app.use(express.json());
app.use(upload());

app.get("/coffees/availableIds", (req, res) => {
  fs.readFile(coffeesFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to fetch coffee data.");
    }

    const coffees = JSON.parse(data);
    const availableIds = coffees.map((coffee) => coffee.id);

    res.status(200).json(availableIds);
  });
});

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

app.post("/coffee/", (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).send("Missing form data.");
  }

  fs.readFile(path.join(__dirname, coffeesFilePath), "utf8", (err, data) => {
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
      path.join(__dirname, coffeesFilePath),
      JSON.stringify(coffees, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error: Unable to write file.");
        }

        return res.sendStatus(200);
      }
    );
  });
});

app.post("/coffee/pictures", (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("Error: No file uploaded.");
  }

  const pic = req.files.file;
  const coffeePicturesDir = path.join(__dirname, "media");
  fs.readdir(coffeePicturesDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error: Unable to read directory.");
    }

    let currentMaxId = 0;
    files.forEach((file) => {
      const fileId = parseInt(path.parse(file).name);
      if (!isNaN(fileId) && fileId > currentMaxId) {
        currentMaxId = fileId;
      }
    });

    const newId = currentMaxId + 1;
    const newName = `${newId}.jpg`;
    const newFilePath = path.join(coffeePicturesDir, newName);

    pic.mv(newFilePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error: Unable to move file.");
      }

      return res.status(200).send("File uploaded and renamed successfully.");
    });
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

const deletedItemsDir = path.join(__dirname, "deleted");

app.delete("/coffees/:id", (req, res) => {
  const id = req.params.id;
  const imagePath = `${coffeePicturesDir}/${id}.jpg`;

  const deletedItemDir = path.join(deletedItemsDir, id.toString());

  fs.mkdirSync(deletedItemDir, { recursive: true });

  fs.rename(imagePath, path.join(deletedItemDir, "image.jpg"), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Failed to move the image to deleted items.");
    }

    fs.readFile(coffeesFilePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to delete the coffee entry.");
      }

      const coffees = JSON.parse(data);
      const updatedCoffees = coffees.filter((coffee) => coffee.id !== Number(id));

      fs.writeFile(coffeesFilePath, JSON.stringify(updatedCoffees), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Failed to delete the coffee entry.");
        }

        res.status(200).send("Image and coffee entry deleted successfully.");
      });
    });
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
