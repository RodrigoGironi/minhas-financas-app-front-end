import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentosService from '../../app/services/lancamentosService'
import LocalStorageService from '../../app/services/localstorageService'
import {mensagemAlerta, mensagemErro, mensagemSucesso } from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';


class ConsultasLancamentos extends React.Component{

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos : []
    }

    constructor(){
        super()
        this.service = new LancamentosService()
    }

    buscar = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        if(!this.state.ano){
            mensagemErro("O campos Ano é Obrigatório.")
            return false
        }

        if(!usuarioLogado){
            mensagemErro("Não há usuário logado no sistema para efetuar uma busca.")
            return false
        }


        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
        .consultar(lancamentoFiltro)
        .then( resposta => {

            const lista = resposta.data            
            if(lista.length < 1)
            {
                mensagemAlerta("Nenhum resultado encontrado.")
                return false
            }
            this.setState({ lancamentos: lista })            
        }).catch( erro =>{
            mensagemErro(erro.response.data)
        })
    }

    editar = (id) =>{
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    abrirConfirmacao = (lancamentos) => {
        this.setState( { showConfirmDialog : true, lancamentoDeletar : lancamentos } )
    }

    cancelarDelecao =() => {
        this.setState( { showConfirmDialog : false, lancamentoDeletar : {} } )
    }

    deletar = ( ) => {
        this.service
        .deletar(this.state.lancamentoDeletar.id)
        .then( resposta => {
            
            const lancamentos = this.state.lancamentos
            const index = lancamentos.indexOf(this.state.lancamentoDeletar)
            lancamentos.splice(index,1)
            this.setState(lancamentos)
            //this.buscar()
            this.setState( { showConfirmDialog : false, lancamentoDeletar : {} } )
            mensagemSucesso("Deletado o index " + lancamentos.id + " com Sucesso.")
        }).catch( erro => {
            mensagemErro(erro.response.data)
        })
    }

    cadastrar = () =>{
        this.props.history.push('/cadastro-lancamentos/0')
    }

    atualizarStatus = (lancamento, status) => {
        this.service
            .atualizarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos
                const index = lancamentos.indexOf(lancamento)
                if(index !== -1){
                    lancamento['status'] = status
                    lancamentos[index] = lancamento
                    this.setState({lancamento})
                }
                mensagemSucesso("Status Atualizado com Sucesso!")
            }).catch( erro =>{
                mensagemErro(erro.response.data)
            })
    }

    render(){

        const meses = this.service.obterMeses()

        const tipos = this.service.obterTipos()

        const comfirmiDialogFooter = () => {
            return (
                <div>
                    <Button label="Confirmar" tooltip="Confirmar" tooltipOptions={{ position: 'top', mouseTrack: true, mouseTrackTop: 15 }} icon="pi pi-check" onClick={ this.deletar }  />
                    <Button label="Cancelar" icon="pi pi-times" onClick={ this.cancelarDelecao } autoFocus className="p-button-text" />
                </div>
            );
        }

        return(
            <Card title="Consultar Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" Label="Ano: *">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputAno" 
                                    value={ this.state.ano }
                                    onChange={ e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />

                            </FormGroup>
                            <FormGroup htmlFor="inputMes" Label="Mês: ">
                                <SelectMenu 
                                    id="inputMes" 
                                    className="form-control" 
                                    value={ this.state.mes }
                                    onChange={ e => { this.setState({ mes: e.target.value })}}
                                    lista={meses} >

                                </SelectMenu>
                            </FormGroup>

                            <FormGroup htmlFor="inputDesc" Label="Descrição: ">
                                <input type="text" 
                                    className="form-control" 
                                    id="inputDesc" 
                                    value={ this.state.descricao }
                                    onChange={ e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição " />

                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" Label="Tipo de Lançamento: ">
                                <SelectMenu 
                                    id="inputTipo" 
                                    className="form-control" 
                                    value={ this.state.tipo }
                                    onChange={ e => { this.setState({ tipo: e.target.value })}}
                                    lista={tipos} >

                                </SelectMenu>
                                <br/>
                                <button type="button" 
                                        onClick={this.buscar} 
                                        className="btn btn-success">
                                        <i className="pi pi-search"></i> Buscar
                                       
                                </button>
                                <button type="button" 
                                        onClick={this.cadastrar} 
                                        className="btn btn-danger">
                                        <i className="pi pi-plus"></i> Cadastrar
                                </button>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div class="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable 
                                    lancamentos={ this.state.lancamentos } 
                                    editAction={ this.editar }
                                    deleteAction={ this.abrirConfirmacao } 
                                    atualizarStatus={ this.atualizarStatus } />
                        </div>
                    </div>
                </div>
                <div>
                <Dialog header="Confirmação" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }} 
                        modal={true} 
                        footer={comfirmiDialogFooter}
                        onHide={() => this.setState( { showConfirmDialog: false } ) }>
                        <p>
                            Deseja realmente excluir esse registro?
                        </p>
                </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultasLancamentos)