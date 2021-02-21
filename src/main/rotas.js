import React from 'react'
import { Route, Switch, HashRouter, Redirect} from 'react-router-dom'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Home from '../views/home'
import ConsultasLancamentos from '../views/lancamentos/consultas-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import { AuthConsumer } from '../main/provedorAutenticacao'



function RotaAutenticada({ component : Component, isUsuarioAutenticado, ...props }){
    return(
        <Route {...props} render={ ( componetProps ) => {
            if(isUsuarioAutenticado)
            {
                return(
                    <Component {...componetProps} />
                )
            }else{
                return(
                    <Redirect to={ { pathname: '/login', state : { from: componetProps.location } } } ></Redirect>
                )                 
            }
        }}>            
        </Route> 
    )
}


function Rotas(props){
    
    return(
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path='/home' component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path='/consultas-lancamentos' component={ConsultasLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path='/cadastro-lancamentos/:id' component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={ context.isAutenticado } /> ) }
    </AuthConsumer>
)