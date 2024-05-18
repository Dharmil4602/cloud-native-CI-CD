const express = require("express");
const server = express();
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const port = 6000;

server.use(express.json());
server.use(bodyParser.json());


server.post("/store-file", async (req, res) => {
  const { file, data } = req.body;
  const persistentStoragePath = '/dharmil_PV_dir';
  // const persistentStoragePath = '../data/';

  if (!file || !data) {
    return res.json({ file: null, error: "Invalid JSON input." });
  }

  // const filePath = `${persistentStoragePath}/${file}`;
  const filePath = `/dharmil_PV_dir/${file}`

  console.log("file: ", file);
  console.log("data: ", data);
  console.log("filepath: ", filePath);

  // fs.writeFile(filePath, data, (err) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ file, error: "Error while storing the file to the storage." });
  //   }
  //   return res.json({ file, message: "Success." });
  // });

  fs.writeFileSync(filePath, data)
  return res.json({ file, message: "Success." });
});


server.post('/calculate', async (req, res) => {
  try {
     const { file, product } = req.body;
 
     console.log("file from cal: ", file);
     console.log("prod from cal: ", product);
 
     if (!file || file.trim() === '' || !product) {
       return res.status(400).json({ file: null, error: "Invalid JSON input." });
     }
 
     const filePath = `/dharmil_PV_dir/${file}`;
 
    //  try {
    //    await fs.access(filePath, fs.constants.F_OK);
    //  } catch (err) {
    //    console.log("Error from cal: ", err);
    //    return res.status(404).json({ file, error: "File not found." });
    //  }

    try {
      await new Promise((resolve, reject) => {
         fs.access(filePath, fs.constants.F_OK, (err) => {
           if (err) {
             reject(err); // Reject the promise if there's an error
           } else {
             resolve(); // Resolve the promise if there's no error
           }
         });
      });
     } catch (err) {
      console.log("Error from cal: ", err);
      return res.status(404).json({ file, error: "File not found." });
     }
     
 
     console.log("Making request to: http://k8-container2-service.default.svc.cluster.local:3000/calculate");
     console.log("Request body:", { file, product });
 
     const response = await axios.post("http://k8-container2-service.default.svc.cluster.local:3000/calculate", {
       file,
       product,
     });

    // const response = await axios.post("http://localhost:3000/calculate", {
    //    file,
    //    product,
    //  });
 
     console.log("Response data:", response.data);
     return res.json(response.data);
  } catch (error) {
     console.error("Error making request:", error);
 
     if (error.response) {
       console.error("Error response:", error.response);
     }
     return res.status(500).json({ error: "Internal server error." });
  }
 });
 


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
