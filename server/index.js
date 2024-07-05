const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute =require("./Routes/userRoute");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute)

app.get("/", (req,res)=>{
    res.send("Welcome a mi livechat")
})

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

app.listen(port, () => {
    console.log(`Tu servidor está corriendo en el puerto: ${port}`);
});

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("La conexión a MongoDB es estable"))
    .catch((error) => console.log("La conexión a MongoDB falló", error.message));
