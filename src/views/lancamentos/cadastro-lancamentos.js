import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosService from '../../app/services/lancamentosService'
import LocalStorageService from '../../app/services/localstorageService'
import {mensagemAlerta, mensagemErro, mensagemSucesso } from '../../components/toastr'

class CadastroLancamento extends React.Component{

state = {
    id: null,
    descricao: '',
    ano: '',
    mes: '',
    valor: '',
    tipo: '',
    status: '',
    usuario: null,
    atualizando: false
    
}

componentDidMount(){
    const params = this.props.match.params
    
    if(params.id){
        this.service
            .obterPoId(params.id)
            .then( response => {
                this.setState({...response.data, atualizando: true})
            })
            .catch( erro => {
                mensagemAlerta(erro.response.data)
                mensagemAlerta("Formulário habilitado para realizar um novo lançamento.")
            })
    }
    else{
        mensagemAlerta("Não foi escolhido nenhum lançamento.")
    }
}

constructor(){
    super()
    this.service = new LancamentosService()
}

submit = () =>{
    
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

    const {descricao,ano,mes,tipo,valor} = this.state
    const lancamento = {
        descricao,ano,mes,tipo,valor, usuario: usuarioLogado.id
    }

    try
    {
        this.service.validar(lancamento)
    }catch(erro){
        const menssagens = erro.mensagens
        menssagens.forEach( msg => mensagemErro(msg));
        return false
    }


    this.service
        .salvar(lancamento)
        .then( resposta => {
            mensagemSucesso("Lançamento de Cadastro realizado com Sucesso!")
            this.props.history.push('/consultas-lancamentos')
        })        
        .catch( erro => {
            mensagemErro("Erro:" + erro.response)
        })

}

atualizar = () => {

    const {descricao,ano,mes,tipo,valor,status,id,usuario} = this.state
    const lancamento = {
        descricao,ano,mes,tipo,valor, status, id, usuario
    }

    try
    {
        this.service.validar(lancamento)
    }catch(erro){
        const menssagens = erro.mensagens
        menssagens.forEach(msg => mensagemErro(msg));
        return false
    }

    this.service
        .atualizar(lancamento)
        .then( resposta => {
            mensagemSucesso("Lançamento de Cadastro atualizado com Sucesso!")
            this.props.history.push('/consultas-lancamentos')
        })        
        .catch( erro => {
            mensagemErro("Erro:" + erro.response)
        })

}




   render(){


    const tipo = this.service.obterTipos()
    const meses = this.service.obterMeses()

       return(
                <Card title={ this.state.atualizando ? "Atualizando Lançamento": "Cadastrando Lançamento"}>
                    <div className="row">
                        <div className="col-md-12">
                            <FormGroup id="inputDescicao" Label="Descrição: *">
                                <input type="text"
                                       id="inputDescicao"
                                       value={ this.state.descricao } 
                                       onChange={ e => { this.setState({ descricao: e.target.value })}}
                                       className="form-control" />
                            </FormGroup>
                        </div>                       
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <FormGroup id="inputAno" Label="Ano: *">
                                    <input type="text"
                                        id="inputAno"
                                        value={ this.state.ano }  
                                        onChange={ e => { this.setState({ ano: e.target.value })}}
                                        className="form-control" />
                            </FormGroup>
                        </div>
                        <div className="col-md-6">
                            <FormGroup id="inputMes" Label="Mês: *">
                                <SelectMenu 
                                            id="inputMes" 
                                            className="form-control" 
                                            value={ this.state.mes }
                                            onChange={ e => { this.setState({ mes: e.target.value })}}
                                            lista={meses} >

                                </SelectMenu>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormGroup id="inputValor" Label="Valor: *">
                                    <input type="text"
                                        id="inputValor" 
                                        value={ this.state.valor } 
                                        onChange={ e => { this.setState({ valor: e.target.value })}}
                                        className="form-control" />
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                            <FormGroup id="inputTipo" Label="Tipo: *">
                                <SelectMenu 
                                        id="inputTipo" 
                                        className="form-control" 
                                        value={ this.state.tipo }
                                        onChange={ e => { this.setState({ tipo: e.target.value })}}
                                        lista={tipo} >

                                </SelectMenu>
                            </FormGroup>
                        </div>
                        <div className="col-md-4">
                        <FormGroup id="inputStatus" Label="Status: ">
                            <input type="text" 
                                   id="inputStatus" 
                                   value={ this.state.status } 
                                   className="form-control" disabled />
                        </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                        {
                            this.state.atualizando
                            ? ( <button type="button" onClick={this.atualizar} className="btn btn-success">
                                <i className="pi pi-refresh"></i> Atualizar
                                </button> )
                            : ( <button type="button" onClick={this.submit} className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar
                                </button> )
                        }
                                <button type="button" onClick={ e => this.props.history.push('/consultas-lancamentos') } className="btn btn-danger">
                                   <i className="pi pi-times"></i> Cancelar
                                </button>
                        </div>
                    </div>                      
                </Card>
       )
   }
}

export default withRouter(CadastroLancamento)