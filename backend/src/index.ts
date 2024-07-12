import express,{Request,Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose";

mongoose.connect(process.env.CONNECTION_STRING as string).then(
    ()=>console.log("connnected to Database")
);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/test",async(req:Request,res:Response)=>{
    res.json({
        message : "Hello!"
    })
})

app.listen(3000,()=>{
    console.log("Server started on localhost:")
})
