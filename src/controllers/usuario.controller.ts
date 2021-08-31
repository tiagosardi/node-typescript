import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";

class UsuarioController{
    public async cadastrar(req: Request,res: Response): Promise<Response>{
        const usuario = await usuarioModel.create(req.body);
        const resposta ={
            message: 'Usuário cadastrado!',
            _id:usuario._id,
            nome: usuario.nome
        };
        return res.json(resposta);
    }
}

export default new UsuarioController();