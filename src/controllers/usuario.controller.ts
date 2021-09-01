import { Request, Response } from "express";
import mensagemModel from "../models/mensagem.model";
import usuarioModel from "../models/usuario.model";
import usuarioRoute from "../routes/usuario.route";
import mensagemService from "../services/mensagem.service";

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

        //contem todos os usuarios, menos o usuario logado
        const usuarios = await usuarioModel.find({
            _id: {
                //$ne eh o not equal
                $ne: idUsuarioLogado
            }    
        });

        //usar os usuarios q tem e capturar a ultima mensagem enviada ou recebida
        const usuariosMensagem= await Promise.all(
            usuarios.map(usuario =>{
                //toda vez q ele passar por aqui, tera um novo id de usuario
                //queremos que retorne a ultima msg de cada usuario para exibir no menu principal
                return mensagemModel.buscaChat(idUsuarioLogado, usuario._id)
                .sort('-createdAt') //ultima mensagem da lista
                .limit(1) //pega apenas 1 mensagem da consulta
                .map(mensagens =>
                     mensagemService.getResultadoMensagemUsuario(mensagens, usuario);
                })
            })
        ); 

        //ordenar mensagens do meu de lista de conversas (dar preferencia para ultimas mensagens mais recentes)
        //compara a data da ultima msg
        const mensagensOrdenadas = mensagemService.retornaMensagensOrdenadas(usuariosMensagem);
        return res.json(mensagensOrdenadas);
    }
}



export default new UsuarioController();