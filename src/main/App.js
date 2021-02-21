import React from 'react'
import 'bootswatch/dist/flatly/bootstrap.css'
import '../css/custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import Rotas from './rotas'
import Navbar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticacao'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




class App extends React.Component{
   render(){
    return (
      <ProvedorAutenticacao>
        <Navbar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    );
   }

}

export default App;
