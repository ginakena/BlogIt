import { Request, Response, NextFunction } from "express";
import zxcvbn from "zxcvbn";

function verifyPasswordStrength(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const result = zxcvbn(password);
    if (result.score < 3 ) {
        res.status(400).json ({message: "Please use a stronger password"});
        return;
    }
    next();
}

export default verifyPasswordStrength;