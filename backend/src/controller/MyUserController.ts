import { Request, Response } from "express";
import User from "../models/User";


const getUser = async(req:Request,res:Response) =>{
    try {
        const user = await User.findById(req.userId);

        if(!user){
            return res.json(404).send("User not found");
        }

        return res.json(user);
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}


const createCurrentUser = async(req : Request,res : Response) =>{

    try {
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({
            auth0Id
        })

        if(existingUser){
            return res.status(200).send();
        }
        
        const newUser = await User.create(req.body); 
        res.status(201).json(newUser.toObject());
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error creating user"
        })
    }
}   

const updateCurrentUser = async (req: Request, res: Response) => {

    try {
        const { name, address, country, city } = req.body;
        const user = await User.findById(req.userId);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        user.name = name;
        user.address = address;
        user.city = city;
        user.country = country;
    
        await user.save();
    
        res.send(user);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
      }
};


export default {
    createCurrentUser,
    updateCurrentUser,
    getUser
}