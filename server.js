import { error, log } from "console";
import express from "express";
import fs, { writeFileSync } from "fs";
import { dirname } from "path";
import { json } from "stream/consumers";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = "data.json";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("sucess");
});

app.post("/add", (req, res) => {
  console.log(req.body);
  fs.readFile(filePath, (error, data) => {
    let contents = error ? [] : JSON.parse(data);
    console.log(contents);
    contents.push(req.body);
    fs.writeFile(filePath, JSON.stringify(contents), (error) => {
      if (error) {
        console.log("error");
        res.status(204).send("error");
      }
      res.status(200).send("added");
    });
  });
});

app.put("/update/:id", async (req, res) => {
  console.log("Function called");

  const { id } = req.params; // Extract ID from URL params
  const { name, age } = req.query; // Extract name & age from query params

  console.log("Received ID:", id);
  console.log("Received Query Params:", { name, age });

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error reading data file",
      });
    }

    try {
      let arr = JSON.parse(data); // Parse JSON file

      // Find the data by ID
      let findData = arr.find((item) => item.id === id);

      console.log(findData); // check the data exist
      //   if exist

      if (!findData) {
        //if not exist
        return res.status(404).json({
          success: false,
          message: "No data found with the given ID",
        });
      }

      // Update the found record with query parameters
      if (name) findData.name = name;
      if (age) findData.age = parseInt(age); // Ensure age is a number

      // Write the updated data back to the file
      fs.writeFile(filePath, JSON.stringify(arr, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).json({
            success: false,
            message: "Error writing data file",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Data updated successfully",
          data: findData,
        });
      });
    } catch (parseError) {
      return res.status(500).json({
        success: false,
        message: "Error parsing data file",
      });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
