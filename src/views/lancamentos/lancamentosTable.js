import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props =>{

    const rows = props.lancamentos.map( Lancamentos => {
        return (
            <tr key={Lancamentos.id}>
                <td>{Lancamentos.descricao}</td>
                <td>{ currencyFormatter.format(Lancamentos.valor, { locale: 'pt-BR'}) }</td>
                <td>{Lancamentos.tipo}</td>
                <td>{Lancamentos.mes}</td>
                <td>{Lancamentos.status}</td>
                <td>
                    <button type="button" 
                            className="btn btn-success"
                            disabled={ Lancamentos.status !== "PENDENTE"}
                            title="Efetivar"
                            onClick={ e => props.atualizarStatus(Lancamentos,'EFETIVADO') }>
                            <i className="pi pi-check-circle"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-warning"
                            disabled={ Lancamentos.status !== "PENDENTE"}
                            title="Cancelar"
                            onClick={ e => props.atualizarStatus(Lancamentos,'CANCELADO') }>
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-primary"
                            title="Editar"
                            onClick={ e => props.editAction(Lancamentos.id) }>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" 
                            className="btn btn-danger"
                            title="Deletar"
                            onClick={ e => props.deleteAction(Lancamentos) }>                            
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return(
        <table className="table table-hover">
            <thead>
                <tr>
                      <th scope="col">Descrição</th>
                      <th scope="col">Valor</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Mês</th>
                      <th scope="col">Situação</th>
                      <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                    {rows}
            </tbody>
        </table>
        
    )
}