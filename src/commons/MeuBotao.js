import React, { Component } from 'react';
import './MeuBotao.css'
class MeuBotao extends Component {
    state = {  }
    render() { 
        return ( 
           <button className="botao" style={{backgroundColor: this.props.color}} onClick={this.props.onClick} disabled={this.props.disabled}>
               {this.props.text}
           </button> 
         );
    }
}
 
export  {MeuBotao};