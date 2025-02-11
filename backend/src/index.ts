import express,{Request,Response} from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoute"

mongoose.connect(process.env.CONNECTION_STRING as string).then(
    ()=>console.log("connnected to Database")
);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user",myUserRoute);

app.listen(3000,()=>{
    console.log("Server started on localhost:")
})
