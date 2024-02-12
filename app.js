import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());

// Create file
app.post("/files", async (req, res) => {
  const { fileName, data } = req.body;

  try {
    await fs.writeFile(`./files/${fileName}.json`, JSON.stringify(data));
    res.status(201).send("Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Get all files
app.get("/files", async (req, res) => {
  try {
    const allFiles = await fs.readdir("./files");
    res.json(allFiles.map((file) => file.replace(".json", "")));
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// Get file by fileName
app.get("/files/:fileName", async (req, res) => {
  const { fileName } = req.params;

  try {
    const fileInfo = await fs.readFile(`./files/${fileName}.json`, "utf-8");
    res.json(JSON.parse(fileInfo));
  } catch (error) {
    console.log(error);
    res.status(404).send("Not found");
  }
});

// Update file
app.put("/files/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const { data } = req.body;

  try {
    await fs.writeFile(`./files/${fileName}.json`, JSON.stringify(data));
    res.send("File updated!");
  } catch (error) {
    console.log(error);
    res.status(404).send("File not found");
  }
});

// Delete file
app.delete("/files/:fileName", async (req, res) => {
  const { fileName } = req.params;

  try {
    await fs.unlink(`./files/${fileName}.json`);
    res.send("File deleted!");
  } catch (error) {
    console.log(error);
    res.status(404).send("File not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running!`);
});
