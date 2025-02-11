import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import User from "../models/User";

declare global{
    namespace Express{
        interface Request{
            userId : string,
            auth0Id: string;
        }
    }
}

const jwtCheck = auth({
    audience: process.env.Auth0_AUDIENCE,
    issuerBaseURL: process.env.Auth0_ISSUEBASEURL,
    tokenSigningAlg: 'RS256'
});

const jwtParse = async (
    req:Request,
    res:Response,
    next : NextFunction
)=>{
    const {authorization} = req.headers;


    console.log("au",authorization);

    if(!authorization || !authorization.startsWith("Bearer ")){
        return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1];


    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0Id = decoded.sub;
        
        const user = await User.findOne({
            auth0Id
        })

        if(!user){
            return res.sendStatus(401);
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();

        next();

    } catch (error) {
        return res.sendStatus(401);
    }

}

export  {
    jwtParse,
    jwtCheck
}