import ApiService from '../apiservices'

import ErroValidacao from '../exception/ErroValidacao'

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credencias){
        return this.post('/autenticar',credencias)
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/',usuario)
    }

    validar(usuario){
        const erros = []

        if(!usuario.nome){
            erros.push('O campo Nome é obrigatório.')
        }

        if(!usuario.email){
            erros.push('O campo Email é obrigatório.')
        }else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um email válido.')
        }

        if(!usuario.senha || !usuario.senharepeticao){
            erros.push('Digite a senha duas vezes.')
        }else if(usuario.senha !== usuario.senharepeticao){
            erros.push('As senhas digitadas não coincidem.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
        
    }
}

export default UsuarioService