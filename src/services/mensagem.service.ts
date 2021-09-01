import { MensagemInterface } from "../interfaces/mensagem.interface";
import { MensagemUsuario, UsuarioInterface } from "../interfaces/usuario.interface";

class MensagemService{
    public getResultadoMensagemUsuario(mensagens: MensagemInterface[], usuario: UsuarioInterface ){
        return{
            //captura os dados do usuario
            _id: usuario._id,
            nome: usuario.nome,
            avatar: usuario.avatar,

            //transforma o array de mensagem relacionadas ao usuario capturado
            //tem q verificar se tem mensagem pra exibir
            ultimaMensagem: mensagens[0] ? mensagens[0].texto : null,//retorna a primeira mensagem da lista invertida se existir, se não existir, retorna null
            dataUltimaMensagem: mensagens[0] ? mensagens[0].createdAt : null,//retorna a data da ultima mensagem se existir, se não existir, retorna null

        }
    }

    public retornaMensagensOrdenadas(usuariosMensagem: MensagemUsuario[]): MensagemUsuario[]{
        return usuariosMensagem.sort((a,b) =>{
            //compara a data da ultima msg
            return (a.dataUltimaMensagem ? 0:1) - (b.dataUltimaMensagem ? 0:1)
                || -(a.dataUltimaMensagem > b.dataUltimaMensagem)
                || +(a.dataUltimaMensagem < b.dataUltimaMensagem)

        });
    }
}

export default new MensagemService(); 