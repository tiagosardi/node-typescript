import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";
import usuarioModels from "../models/usuario.model";

class UsuarioController{
    public async cadastrar(req: Request,res: Response): Promise<Res>{
        const usuario = await usuarioModel.create(req.body);
        return res.json(usuario);
    }
}

export default new UsuarioController();