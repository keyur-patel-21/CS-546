// Code server here
// Your server this week should not do any of the processing or calculations
// Your server only exists to allow someone to get to the HTML Page and download the associated assets to run the application


import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "static", "webpage.html");
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
