import { error, log } from "console";
import express from "express"
import fs, { writeFileSync } from "fs"
import { dirname } from "path";
import { json } from "stream/consumers";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url))
const filePath = "data.json"

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("sucess")
})

app.post('/add', (req, res) => {
    console.log(req.body);
    fs.readFile(filePath, (error, data) => {
        let contents = error ? [] : JSON.parse(data)
        console.log(contents);
        contents.push(req.body)
        fs.writeFile(filePath, JSON.stringify(contents), (error) => {
            if (error) {
                console.log("error");
                res.status(204).send("error")
            }
            res.status(200).send("added")
        })

    })
})

app.put("/update/:id", async (req, res) => {
    console.log('fn called');
    console.log(req.body,'req body');

    const { id } = req.params
    const {name,age}=req.query
    console.log(id);

    fs.readFile(filePath, (err, data) => {
        // const arr = err ? res.status(200).send("No Data") : JSON.parse(data)
        // arr.forEach((e) => {
        //     if (e.name == name && e.age == age) {
        //         e.name = req.body.name
        //         e.age = req.body.age
        //         fs.writeFileSync(filePath, JSON.stringify(arr))
        //     } else {
        //         res.status(200).send("Not found")
        //     }
        // })
        let arr = []
        if (err) {
            return res.status(302).json({ success: false, message: "unexpected error while reading file" })

        } else {
            try {
                arr = JSON.parse(data)
                console.log(arr, 'array object after pushng');

            } catch (error) {
                console.log(error);

            }
            let findData = arr.find((item) => item.id === id);

            console.log(findData, 'found data');
            findData.name = req.body.name
            findData.age = req.body.age
            console.log(findData, "after updation"
            );

            
            let filterData= arr.filter((item)=>item.id!==id)
            console.log(filterData,'lknkljkjl');
            
            
            console.log(arr,'array');

            if (findData) {
                arr.forEach((e) => {


                });
                return res.status(200).json({ success: true, message: "data found success", data: findData })
            } else {
                return res.status(302).json({ success: false, message: "no data found" })
            }
        }
    })
})




// app.put('/update/:id',(req,res)=>{
//     const id=Number(req.params.id)
//     const newData=req.body
//     console.log(newData);

//     fs.readFile(filePath,(error,data)=>{
//         let contents=[]
//         if(!error){
//             try{
//                 contents=JSON.parse(data)
//             }catch(err){
//                 res.status(500).send("error")
//             }
//         }

//         let item=false
//         contents=contents.map(item=>{
//             if(item.id===id){
//                 item=true
//                 return{...item,...newData}
//             }
//             return item
//         })
//         if(!item){
//             res.status(400).send("not found")
//         }
//         fs.writeFile(filePath,JSON.stringify(contents),(error)=>{
//             if(error){
//                 console.log("error in writefile");
//                 res.status(500).send("update error")

//             }
//             res.status(200).send("update sucessfull")
//         })

//     })

// })


const port = 3000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);

})







// async function connectDB() {
//     try{
//         await mongoose.connect("mongodb://localhost:27017/todo")
//         console.log("db connected");
//         app.listen(3000,()=>{
//             console.log("http://localhost:3000");
            
//         })
        
//     }catch(error){
//         console.log("db conn error",error);
        
//     }
    
// }