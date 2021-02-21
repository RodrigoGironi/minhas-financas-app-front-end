import React from 'react'
import NavbarItens from '../components/navbaritens'
import { AuthConsumer } from '../main/provedorAutenticacao'


function Navbar(props){
    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="#/home" 
             className="navbar-brand" style={{fontSize:'20px', fontWeight: 'bolder'}}>
                 Minhas Finanças
          </a>
          <button className="navbar-toggler" 
                  type="button" 
                  data-toggle="collapse" 
                  data-target="#navbarResponsive" 
                  aria-controls="navbarResponsive" 
                  aria-expanded="false" 
                  aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon">

                 </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavbarItens render={props.isUsuarioAutenticado} href="#/home" Label="Home" />
                <NavbarItens render={props.isUsuarioAutenticado} href="#/cadastro-usuarios" Label="Usuários" />
                <NavbarItens render={props.isUsuarioAutenticado} href="#/consultas-lancamentos" Label="Lançamentos" />
                <NavbarItens render={props.isUsuarioAutenticado} onClick={props.deslogar} href="#/login" Label="Sair" />                
            </ul>
          </div>
        </div>
      </div>
    )
}

export default () => (
  <AuthConsumer>
    {(context) => (<Navbar isUsuarioAutenticado={ context.isAutenticado} deslogar={ context.encerrarSessao } />) }
  </AuthConsumer>
)