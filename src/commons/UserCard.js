import React, { Component } from 'react';
import './UserCard.css'
import { MeuLink, MeuBotao, Modal} from '../commons'
import { Atualizar} from '../components/Inputs'

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {moda:false, modalContent: null}
    }
    accAtualizar(){
        this.setState({modalContent: <Atualizar id={this.props.id} CPF={this.props.CPF}/>, modal:true})
    }
    render() { 
        return (  
            <div className="userCard">
                {this.state.modal ? <Modal onClick={() => this.setState({modal:false})}>{this.state.modalContent}</Modal> : null}
                <img className="userImg" src={this.props.link} alt="Foto de usuario"/>
                <p>{this.props.nome}</p>
                <div className="b">
                    <MeuLink text="Ver mais" to={`/u/${this.props.id}`}/> 
                     <MeuBotao text="Atualizar" onClick={()=>this.accAtualizar()}/>  
                </div>
                
            </div>
        );
    }
}
 
export {UserCard};