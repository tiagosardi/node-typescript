import { Request, Response } from "express";
import usuarioModel from "../models/usuario.model";
import usuarioRoute from "../routes/usuario.route";

class UsuarioController{
    public async cadastrar(req: Request,res: Response): Promise<Response>{
        const usuario = await usuarioModel.create(req.body);
        const resposta ={
            message: 'Usuário cadastrado!',
            _id:usuario._id,
            nome: usuario.nome,
            senha: usuario.senha,
            avatar:usuario.avatar   
        };
        return res.json(resposta);
    }

    public async autenticar(req: Request, res: Response): Promise<Response>{
        const {nome, senha} = req.body;

        //findOne busca apenas 1 registro no bd
        const usuario = await usuarioModel.findOne( {nome:nome});
        if(!usuario){
            return res.status(400).send({message:'Usuário não encontrado.'});
        }

        const senhaValida = await usuario.compararSenhas(senha);
        if(!senhaValida){
            return res.status(400).send({message:'Senha Inválida.'});
        }

        return res.json({
            usuario: usuario,
            token: usuario.gerarToken()
        });
    }

    //busca id do usuario e captura os dados
    public getById(req: Request , res:Response): Response{
        return res.json(req.usuarioChat);
    }

    public async listar(req: Request , res:Response): Promise<Response>{
        const idUsuarioLogado = req.usuario._id;

        const usuarios = await usuarioModel.find({
            _id: {
                //$ne eh o not equal
                $ne: idUsuarioLogado
            }
            
            
        });
        return res.json(usuarios);
    }
}



export default new UsuarioController();