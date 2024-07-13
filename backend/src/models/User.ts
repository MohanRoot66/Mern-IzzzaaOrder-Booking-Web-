import mongoose from "mongoose";

const UserScheme  = new mongoose.Schema(
    {
        auth0Id:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        name:{
            type:String,
        },
        address:{
            type:String,
        },
        city:{
            type:String,
        },
        country:{
            type:String,
        },
    }
)

const User = mongoose.model("User",UserScheme);

export default User;