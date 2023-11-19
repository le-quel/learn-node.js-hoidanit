import express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB.js';
require('dotenv').config();
let app = express();
app.set('views', './src/views/test');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT;
// port === undefined => port = 6969
app.listen(port, () => {
    console.log("Khởi động thành công server port: "+port)
})