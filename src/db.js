import "dotenv/config";
import mongoose from "mongoose";  

console.log("db.js", process.env.DB_URL);


mongoose.connect(process.env.DB_URL, {
 
   useNewUrlParser: true, 
   useUnifiedTopology: true,

}); 


const db = mongoose.connection; 


const handleOpen = () =>  console.log("connected to DB ");
const handleError = () => console.log("Db Error", error); 

db.on("error", handleError); 
db.on("open", handleOpen); 

