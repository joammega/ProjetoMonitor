import React, { Component } from 'react';
import FlatList from 'flatlist-react'
import { UserCard, MeuBotao, MeuInput, Modal} from '../commons'
import {Remover, Adicionar, Recuperar} from './Inputs'
import './Principal.css'
import * as firebase from 'firebase/app'
import 'firebase/firestore'


class principal extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.match.params;
        this.state = {loading:false, modal : false, modalContent: null , users:[], search:""};
        this.ref = firebase.firestore().collection('users').where('uid', "==", this.params.id)
        
        
    }
    
    componentDidMount(){
        this.ref.onSnapshot(this.alimentarUsers.bind(this))
    }

    handleSearch(e){
        this.setState({search: e.target.value});
        
    }
    fazerBusca(){
        this.ref.where('nome', "==", this.state.search).get().then((q)=>{
            this.alimentarUsers(q)
        })
    }
    alimentarUsers(q){
        let users= []
        q.forEach((doc)=>{
            users.push({
                key : doc.id,
                ...doc.data()
            })
        }
        )
        this.setState({users})
        console.log(this.state.users)
    }
    userMake(user){
        return <UserCard link={user.foto} nome={user.nome} id={user.key} CPF={user.CPF} />
    }
    
    accRemove(){
        this.setState({modalContent: <Remover/>, modal:true})
        
    }
    accAdd(){
        this.setState({modalContent: <Adicionar uid= {this.params.id}/>, modal:true})
        
    }
    accRetrieve(){
        this.setState({modalContent: <Recuperar/>, modal:true})
        
    }
    render() { 
        return ( 
       
        <div className="userConteiner">
            {this.state.modal ? <Modal onClick={() => this.setState({modal:false})}>{this.state.modalContent}</Modal> : null}
            <div className="functions">
                <div className="botoes">
                <MeuBotao text="Remover" color="rgb(255, 38, 38)" onClick={()=>this.accRemove()}/>
                <MeuBotao text="Encontrar" color="rgb(47, 47, 253)"onClick={()=>this.accRetrieve()} />
                <MeuBotao text="Adicionar" color="rgb(0, 185, 0)" onClick={()=>this.accAdd()}/>
                </div>
                
                <div className="search">
                    <div className="flex">
                    <MeuInput onChange={this.handleSearch.bind(this)}/>
                    </div>
                    
                    <MeuBotao  color="gray" text="buscar" onClick={()=>this.fazerBusca()}/>
                </div>
                
            </div>
            <div className="users">
                
                <FlatList list={this.state.users} renderItem={this.userMake}/>
            </div>
            
            
        </div> 
        );
    }
}
 
export default principal;