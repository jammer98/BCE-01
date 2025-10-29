import dotenv from 'dotenv'
import connectDB from '../Db/Connection.js'
import { app } from './app.js';
dotenv.config()

connectDB()
.then( ()=>{

  app.on("error",(error)=>{
    console.log("error :",error);
    throw error;
  })


  app.listen(process.env.PORT || 4000 , ()=>{
    console.log(`App is listening on port :${process.env.PORT}`);
  })
})
.catch((error) => console.log("DATABASE CONNECTION ERROR",error));
