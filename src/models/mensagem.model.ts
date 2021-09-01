import { Model, model, Schema } from "mongoose";
import { MensagemInterface } from "../interfaces/mensagem.interface";

interface mensagemModel extends MensagemInterface,Document{}

interface MensagemStatic extends Model<mensagemModel>{
    buscaChat(idUsuarioLogado:string,idUsuarioChat:string):DocumentQuery<mensagemModel[], mensagemModel>
}

const MensagemSchema = new Schema({
    texto:{
        type: String,
        required: true,

    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    remetente: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false,
    },
    destinatario: {
        type:Schema.Types.ObjectId,
        ref: 'Usuario',
        required: false,
    }
});

//metodo estatico (nao precisa fazer instancia de classe para fazer consultas)
MensagemSchema.statics.buscaChat = function(idUsuarioLogado: string, idUsuarioChat:string): DocumentQuery<mensagemModel[], mensagemModel>{
    return this.find({
        $or:[
            {$and: [{ remetente: idUsuarioLogado}, { destinatario: idUsuarioChat}]},
            {$and: [{ remetente: idUsuarioChat}, { destinatario: idUsuarioLogado}]}
        ]
    })
}

export default model<mensagemModel, MensagemStatic>('Mensagem', MensagemSchema);