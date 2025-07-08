import { Request, Response, NextFunction } from "express";

function verifyUserInformation(req: Request, res: Response, next: NextFunction) {
     const  { firstName, lastName, userName, email, password } = req.body;

     if(!firstName) {
        res.status(400).json({message: "First Name is required"});
        return;
     }

     if(!lastName) {
        res.status(400).json({message: "Last Name is required"});
        return;
     }
       if(!userName) {
        res.status(400).json({message: "User Name is required"});
        return;
     }
       if(!email) {
        res.status(400).json({message: "Email is required"});
        return;
     }
       if(!password) {
        res.status(400).json({message: "Password is required"});
        return;
     }

     next();
}
export default verifyUserInformation;