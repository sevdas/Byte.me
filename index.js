const express = require("express");
const app = express();
const port = 3000;

const static = express.static("public");
app.use(static);

//Handle routes
app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
