import React, { Component } from 'react';
import './Modal.css'
class Modal extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="modalConteiner">
                <div className="onClick" onClick={this.props.onClick} >
                
                
                </div>
                <div className="modal">
                        {this.props.children}
                </div>
            </div>
            
         );
    }
}
 
export  {Modal};