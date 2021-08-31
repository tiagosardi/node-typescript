import { Schema, model,  Document } from "mongoose";
import { UsuarioInterface } from "../interfaces/usuario.interface";
import bcrypt from 'bcrypt';

interface UsuarioModel extends UsuarioInterface, Document{
    compararSenhas(senha:string):Promise<boolean>;
}

const UsuarioSchema = new Schema({
    nome:{
        type: String,
        required: true,

    },
    senha:{
        type: String,
        required: true,
    },
    avatar: {
        type:String,
        required: false,
    }
});

UsuarioSchema.pre<UsuarioModel>('save', async function criptografarSenha(){
    this.senha = await bcrypt.hash(this.senha, 8);
});

UsuarioSchema.pre<UsuarioModel>('save', function gerarAvatar(){
    const randomId = Math.floor(Math.random()*(1000000))+1;
    this.avatar = 'https://api.adorable.io/avatars/285/${randomId}.png';
})

UsuarioSchema.methods.compararSenhas = function(senha:string): Promise<boolean>{
    return bcrypt.compare(senha, this.senha);
}

export default model<UsuarioModel>('Usuario', UsuarioSchema);