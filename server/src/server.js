require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./api/configuration/app");
const PORT = process.env.PORT || 3001 ;

// const production_DB = process.env.NSL_DB; 
//local db url
// const local_DB = "mongodb://localhost:27017/nsl-system"; 
// const DB = 'mongodb+srv://saimom_islam:F6ACwVvvM33R9C5T@cluster0.ku9fi.mongodb.net/One-Solution?retryWrites=true&w=majority';
// console.log(DB);
//db connection
const DB = process.env.DB;
(async function dbConnection(url){
   await mongoose.connect(url);

})(DB).then(()=> console.log("Successfully DB Connected"))
    .catch(err => console.log("DB not connected"))

app.listen(PORT, ()=>{
   console.log(`Listening on Port ${PORT}`);
})