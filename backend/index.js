import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import route from "./routes/userRoute.js";
import cors from 'cors'

const app = express();
app.use(bodyParser.json());
app.use(cors())
dotenv.config();

const PORT = 2600;
const DATABASE = "mongodb://localhost:27017/tasawar";

// mongoose.connect(DATABASE)
//     .then( () => {
//         console.log("database is connected successfuly")
//         app.listen(PORT, () => {
//             console.log(`app is running on port : ${PORT}`)
//         })
//     })
//     .catch((error) =>
//         console.log(error));

// app.use("/api", route);
mongoose.connect(DATABASE).then(() => {
    console.log("bd connected successfully");
    app.listen(PORT, () => {
        console.log(`app is running on port : ${PORT}`)
    })
}).catch((error) => console.log(error))

app.use("/api", route)
