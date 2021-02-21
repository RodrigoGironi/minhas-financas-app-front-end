import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import UsuarioService from '../app/services/usuarioService'
import {mensagemSucesso, mensagemErro} from '../components/toastr'
import { withRouter } from 'react-router-dom'


class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        senharepeticao: ''
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

   
    cadastrar = () => {

       const {nome, email, senha, senharepeticao} = this.state
       const usuario = {nome, email, senha, senharepeticao}

        try{
             this.service.validar(usuario)
        }
        catch(erro){
            const mensagens = erro.mensagens
            mensagens.forEach( msg =>  mensagemErro(msg));
            return false
        }

        this.service.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
            console.log(response.data)
            this.props.history.push('/login')
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render(){
        return(
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup Label="Nome: *" htmlFor="inputNome">
                                   <input type="text"
                                          value={this.state.nome} 
                                           onChange={e => this.setState({nome : e.target.value})}
                                           className="form-control" 
                                           id="inputNome"
                                           name="nome" 
                                           aria-describedby="emailHelp" 
                                           placeholder="Digite o Nome"/>
                                </FormGroup>
                                <FormGroup Label="Email: *" htmlFor="inputEmail">
                                   <input type="email"
                                          value={this.state.email} 
                                           onChange={e => this.setState({email : e.target.value})}
                                           className="form-control" 
                                           id="inputEmail"
                                           name="email" 
                                           aria-describedby="emailHelp" 
                                           placeholder="Digite o Email"/>
                                </FormGroup>
                                <FormGroup Label="Senha: *" htmlFor="inputSenha">
                                   <input type="password"
                                          value={this.state.senha} 
                                           onChange={e => this.setState({senha : e.target.value})}
                                           className="form-control" 
                                           id="inputSenha"
                                           name="senha" 
                                           aria-describedby="emailHelp" 
                                           placeholder="Digite a Senha"/>
                                </FormGroup>
                                <FormGroup Label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                   <input type="password"
                                          value={this.state.senharepeticao} 
                                           onChange={e => this.setState({senharepeticao : e.target.value})}
                                           className="form-control" 
                                           id="inputRepitaSenha"
                                           name="senharepeticao" 
                                           aria-describedby="emailHelp" 
                                           placeholder="Digite a Senha" />
                                </FormGroup>
                                <button onClick={this.cadastrar} 
                                        type="button" 
                                        className="btn btn-success">
                                         <i className="pi pi-save"></i> Salvar
                                </button>
                                <button onClick={this.cancelar} 
                                        type="button" 
                                        className="btn btn-danger">
                                        <i className="pi pi-undo"></i> Voltar
                                </button>
                            </div>
                        </div>
                    </div>
                </Card>
           
        )
    }

}

export default withRouter(CadastroUsuario)