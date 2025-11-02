import dotenv from 'dotenv'
import connectDB from '../Db/Connection.js'
import { app } from './app.js';
dotenv.config()

connectDB()
.then(()=>{
  app.on("error",(error)=>{
    console.log(" Server error :",error);
    process.exit(1);
  })

  app.listen(process.env.PORT, ()=>{
    console.log(`App is listening on port :${process.env.PORT}`);
    console.log(`App is running of the port : http://localhost:${process.env.PORT}/`)
  })
})
.catch((error) => {
    console.log("DATABASE CONNECTION ERROR",error);
    process.exit(1);

})




