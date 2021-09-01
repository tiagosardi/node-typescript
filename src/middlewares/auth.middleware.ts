import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UsuarioInterface } from "../interfaces/usuario.interface";
import usuarioModel from "../models/usuario.model";


class AuthMiddleware{
    public autorizarUsuarioByToken(req: Request, res: Response){
        const token = req.query.token || req.headers['x-access-token'];
        if(!token){
            return res.status(401).send({message: 'Acesso Negado!'})
            //401 eh um erro de autorizacao
        }

        try{
            //essa funcao vai decodificar o token
            const usuarioToken = jwt.verify(token, 'SECRET') as UsuarioInterface;
            
            const usuario = await usuarioModel.findById(usuarioToken._id);

            if(!usuario){
                return res.status(400).send({'Usuário não existe no banco.'})
            }
            req.usuario = usuario;

            return next();

        }catch(error){
            return res.status(401).send({message: 'Token invalido!'});

        }

    }
}

export default new AuthMiddleware();