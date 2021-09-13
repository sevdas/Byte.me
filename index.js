const express = require("express");
const app = express();
const port = 3000;

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://firebase-adminsdk-y02g0@byteme-ec98c.iam.gserviceaccount.com",
});

const static = express.static("public");
app.use(static);

//Extract the POST request body data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const db = admin.firestore();

//Handle routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const isAbsoluteUrl = (url) => /^[a-z][a-z0-9+.-]*:/.test(url);

app.post("/api/shortened", async (req, res) => {
  const { href } = req.body;

  let shortUrl = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++) {
    shortUrl += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  if (isAbsoluteUrl(href)) {
    //shorten url function
    console.log("url", shortUrl);
    const data = {
      shortUrl,
      fullUrl: href,
    };

    const shortRes = await db
      .collection("shortUrls")
      .doc(shortUrl)
      .set({ ...data, viewCount: 0 });
    const longRes = await db
      .collection("longUrls")
      .doc(href.replace("https://", ""))
      .set(data);
    console.log(shortRes);
    res.send({ shortUrl });
  } else {
    console.log("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
