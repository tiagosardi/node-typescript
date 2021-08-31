import { Request, Response } from "express";

class AuthMiddleware{
    public autorizarUsuarioByToken(req: Request, res: Response){
        const token = req.query.token || req.headers['x-acess-token'];
        if(!token){
            return res.status(401).send({message: 'Acesso Negado!'})
            //401 eh um erro de autorizacao
        }
        return next();
    }
}

export default new AuthMiddleware();