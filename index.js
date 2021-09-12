const express = require("express");
const app = express();
const port = 3000;

const static = express.static("public");
app.use(static);

//Extract the POST request body data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Handle routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
