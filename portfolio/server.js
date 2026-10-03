const express = require("express");
const os = require("os");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function getContainerIp() {
  try {
    const interfaces = os.networkInterfaces();
    for (const iface of Object.values(interfaces)) {
      for (const config of iface) {
        if (config.family === "IPv4" && !config.internal) {
          return config.address;
        }
      }
    }
    return "Unknown";
  } catch (error) {
    return "Unknown";
  }
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/", (req, res) => {
  const name = req.body.name || "Guest";
  const ipAddress = getContainerIp();
  const greeting = `Hello ${name}, I am greeting you from a JavaScript container with IP address ${ipAddress}`;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Auto Deploy !!!! Student Portfolio</title>
    </head>
    <body>
        <h1>Yupeng Du</h1>
        <form method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <button type="submit">Submit</button>
        </form>
        <p>${greeting}</p>
        <br><hr><br>
        <a href="http://192.168.56.67:5000" id="banking-link">
            <button type="button">View Banking App</button>
        </a>
    </body>
    </html>
    `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
