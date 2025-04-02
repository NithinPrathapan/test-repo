// const express= require('express')
// import express from "express"
// const app=express()
// app.use(express.urlencoded())
// app.post("/",(req,res)=>{
//     console.log(req.body);
//     res.status(200).send("helloo")
    
// })
// const port =3000
// app.get('/',(req,res)=>{
//     res.status(200).send("learning express")
// })
// app.listen(port,()=>{
//     console.log(`server is running at http://localhost:${port}`);
    
// })



// import express from "express"
// import fs from "fs"
// import {dirname,join} from 'path'
// import { fileURLToPath } from "url"

// let __dirname=dirname(fileURLToPath(import.meta.url))
// console.log(__dirname);

// const app=express()
// app.use(express.json())
// app.post("/adddata",(req,res)=>{
//     console.log(req.body);
//     let filepath="data.json"
//     let data=[]
//     data.push(req.body)
//     fs.writeFileSync(filepath, JSON.stringify(req.body))
//     fs.appendFileSync("data.json", JSON.stringify(req.body))
//     res.status(200).send("learning express")
// })
// app.listen(3000,()=>{
//     console.log("http://localhost:3000");
    
// })




// import express from "express";
// import fs from "fs";
// import { dirname } from "path";
// import { fileURLToPath } from "url";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// const filePath = "data.json";

// const app = express();
// app.use(express.json());


// const readData = () => {
//     if (fs.existsSync(filePath)) {
//         let fileContent = fs.readFileSync(filePath, "utf-8");
//         return fileContent.trim() ? JSON.parse(fileContent) : [];
//     }
//     return [];
// };


// const writeData = (data) => {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// };


// app.post("/adddata", (req, res) => {
//     let data = readData();
//     let newEntry = { id: Date.now(), ...req.body }; 
//     data.push(newEntry);
//     writeData(data);
//     res.status(201).json({ message: "Data added successfully", data: newEntry });
// });


// app.get("/getdata", (req, res) => {
//     let data = readData();
//     res.status(200).json(data);
// });


// app.put("/updatedata/:id", (req, res) => {
//     let data = readData();
//     let id = Number(req.params.id);
//     let updated = false;

//     data = data.map((item) => {
//         if (item.id === id) {
//             updated = true;
//             return { ...item, ...req.body };
//         }
//         return item;
//     });

//     if (updated) {
//         writeData(data);
//         res.status(200).json({ message: "Data updated successfully" });
//     } else {
//         res.status(404).json({ error: "Data not found" });
//     }
// });


// app.delete("/deletedata/:id", (req, res) => {
//     let data = readData();
//     let id = Number(req.params.id);
//     let newData = data.filter((item) => item.id !== id);

//     if (newData.length !== data.length) {
//         writeData(newData);
//         res.status(200).json({ message: "Data deleted successfully" });
//     } else {
//         res.status(404).json({ error: "Data not found" });
//     }
// });

// app.listen(3000, () => {
//     console.log("Server running at http://localhost:3000");
// });





