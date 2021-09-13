import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

export const firebaseConfig = {
  apiKey: "byteme-ec98c-firebase-adminsdk-y02g0-da5826395a",
  authDomain: "byteme-ec98c.firebaseapp.com",
  databaseURL: "https://byteme-ec98c.firebaseio.com",
  projectId: "byteme-ec98c",
  storageBucket: "byteme-ec98c.appspot.com",
  messagingSenderId: "112360857812361272809",
  appId: "Ada5826395a9fb587f80aa9492d406b8f3346829e",
  measurementId: "byteme-ec98c",
};

const app = initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of shortened urls from your database
async function getShortenedUrls(db) {
  const shortenedUrlsCol = collection(db, "urls");
  const urlSnapshot = await getDocs(shortenedUrlsCol);
  const urlList = urlSnapshot.docs.map((doc) => doc.data());
  return urlList;
}
