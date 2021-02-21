import React from 'react'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/services/usuarioService'
import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component{

    state = {
        saldo: 0
    }

    constructor(){
        super()
        this.service = new UsuarioService()
    }

    componentDidMount(){               
        const userLogado = JSON.parse(this.context.usuarioAutenticado)  //LocalStorageService.obterItem('_usuario_logado')
        console.log("userLogado",userLogado)
        if(userLogado != null)
            this.service
                .obterSaldoPorUsuario(userLogado.id)
                .then(response => {
                   this.setState({saldo: response.data})
                }).catch( erro =>{
                   console.error(erro.response)
                })
    }

    render(){

        return(
            <div className="jumbotron">
                <h1 className="display-3">
                    Bem vindo!
                </h1>
                <p className="lead">
                    Esse é seu sistema de finanças.
                </p>
                <p className="lead">
                    Seu saldo para o mês atual é de R$ {this.state.saldo}
                </p>
                    <p>
                        E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.
                    </p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg" href="#/cadastro-usuarios" role="button">
                            <i className="pi pi-user-plus"></i> Cadastrar Usuário
                        </a>
                        <a className="btn btn-danger btn-lg" href="#/cadastro-lancamentos/0" role="button">
                            <i className="pi pi-check-circle"></i> Cadastrar Lançamento
                        </a>
                    </p>
                
            </div>
        )
    }

}

Home.contextType = AuthContext

export default withRouter(Home)