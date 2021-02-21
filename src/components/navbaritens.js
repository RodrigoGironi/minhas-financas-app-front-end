import React from 'react'


function NavBarItens({render, ...props}){
    if(render)
    {
        return(
            <li className="nav-item">                    
                <a onClick={ props.onClick} className="nav-link" href={props.href}>
                    {props.Label}
                </a>
            </li>
        )
    }
    else{
        return false
    }
    
}

export default NavBarItens