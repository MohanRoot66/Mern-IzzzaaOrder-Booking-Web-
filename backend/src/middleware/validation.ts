import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";


const handleValidationError = async(req:Request,res:Response,next:NextFunction)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
            errors:errors.array()
        });
    }
    next();
}

export const ValidateRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("address").isString().notEmpty().withMessage("Adress must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationError,
]
