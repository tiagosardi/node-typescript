import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import usuarioModel from "../models/usuario.model";
class AuthMiddleware{
    public autorizarUsuarioByToken(req: Request, res: Response){
        const token = req.query.token || req.headers['x-acess-token'];
        if(!token){
            return res.status(401).send({message: 'Acesso Negado!'})
            //401 eh um erro de autorizacao
        }

        const usuarioToken = jwt.verify(token, 'SECRET')
        const usuario = await usuarioModel.findById(usuarioToken._id);
        return next();
    }
}

export default new AuthMiddleware();