import jwt from "jsonwebtoken";
import {Request} from "express";

const getJwtToken = (req: Request) => {
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        return authHeader.split(" ")[1];
    }
}

export const userAuthentication = async (req, res, next) => {
    const token = getJwtToken(req);
    if(!token){
        res.status(401).send({
            status: 'danger',
            message: `Authentication failed`,
            code: 401,
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err){
            res.status(401).send({
                status: 'danger',
                message: `Authentication failed`,
                code: 401,
            });
        }

        req.user = decoded.user;
        req.token = token;

        return next();
    });
}

