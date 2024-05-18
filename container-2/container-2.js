const express = require("express");
const server = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 3000;

server.use(express.json());
server.use(bodyParser.json());

server.post("/calculate", async (req, res) => {
  try {
     const { file, product } = req.body;
     const persistentStoragePath = '/dharmil_PV_dir';
 
     console.log("file: ", file);
     console.log("product: ", product);
 
     // Validate input
     if (!file || !product) {
       return res.json({ file: null, error: "Invalid JSON input." });
     }
 
     const filePath = `/dharmil_PV_dir/${file}`;
 
     fs.access(filePath, fs.constants.F_OK, (err) => {
       if (err) {
         return res.status(404).json({ file, error: "File not found." });
       }
 
       fs.readFile(filePath, 'utf8', (err, data) => {
         if (err) {
           console.error(err);
           return res.status(500).json({ file, error: "Error reading the file." });
         }
         const lines = data.trim().split('\n');
         
         if (lines.length < 2 || !lines[0].includes(',') || !lines[1].includes(',')) {
           return res.json({ file, error: "Input file not in CSV format." });
         }
 
         let sum = 0;
         for (const line of lines.slice(1)) {
           const [prod, amount] = line.split(',');
           if (prod.trim() === product) {
             sum += parseInt(amount.trim(), 10);
           }
         }
 
         console.log("Sum: ", sum);
 
         if (sum === 0) {
           return res.status(400).json({ file, error: `Product '${product}' not found in the file.` });
         }
 
         return res.json({ file, sum });
       });
     });
  } catch (error) {
     console.log("container-2: ", error);
     return res.status(500).json({ error: "Internal server error." });
  }
 });
 

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
