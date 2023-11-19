// Import necessary modules
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "static", "homepage.html");
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
