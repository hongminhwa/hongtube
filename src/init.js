import "dotenv/config";
import"./db";
import "./models/Video";
import app from "./server";
import "./models/User";
import "./models/Comment";

const PORT = 4000; 

const handleListening = () =>
 console.log(`server listing on port localhost:${PORT}`);


app.listen(PORT, handleListening);