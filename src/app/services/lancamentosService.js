import ApiService from '../apiservices'

import ErroValidacao from '../exception/ErroValidacao'

class LancamentoService extends ApiService{

    constructor(){
        super('/api/lancamentos')
    }

    obterMeses(){
        return  [
            {label: 'SELECIONE..', value: 0},
            {label: 'JANEIRO', value: 1},
            {label: 'FEVEREIRO', value: 2},
            {label: 'MARÇO', value: 3},
            {label: 'ABRIL', value: 4},
            {label: 'MAIO', value: 5},
            {label: 'JUNHO', value: 6},
            {label: 'JULHO', value: 7},
            {label: 'AGOSTO', value: 8},
            {label: 'SETEMBRO', value: 9},
            {label: 'OUTUBRO', value: 10},
            {label: 'NOVEMBRO', value: 11},
            {label: 'DEZEMBRO', value: 12}

        ]
    }

    obterTipos(){
        return [
            {label:'SELECIONE O TIPO...', value:''},
            {label:'RECEITA', value: 'RECEITA' },
            {label:'DESPESA', value: 'DESPESA' }
        ]
    }

    obterPoId(id){
        return this.get(`/${id}`)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
    }

    atualizarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status })
    }

    validar(lancamento){
        const erros = []

        if(!lancamento.ano){
            erros.push("Informe o ano.")
        }

        if(!lancamento.mes){
            erros.push("Informe o mês.")
        }

        if(!lancamento.descricao){
            erros.push("Informe a descriçãso.")
        }

        if(!lancamento.tipo){
            erros.push("Informe o tipo.")
        }

        if(!lancamento.valor){
            erros.push("Informe o valor.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros)
        }
        
    }

    consultar(LancamentoFiltro){

        let params = `?ano=${LancamentoFiltro.ano}`

        if(LancamentoFiltro.mes){
            params = `${params}&mes=${LancamentoFiltro.mes}`
        }

        if(LancamentoFiltro.tipo){
            params = `${params}&tipo=${LancamentoFiltro.tipo}`
        }

        if(LancamentoFiltro.status){
            params = `${params}&status=${LancamentoFiltro.status}`
        }

        if(LancamentoFiltro.usuario){
            params = `${params}&usuario=${LancamentoFiltro.usuario}`
        }
        
        if(LancamentoFiltro.descricao){
            params = `${params}&descricao=${LancamentoFiltro.descricao}`
        } 

        return this.get(params)
    }

    deletar(id){
        return this.delete(`/${id}`)
    }

    salvar(lancamentos){
        return this.post('/', lancamentos)
    }

}


export default LancamentoService