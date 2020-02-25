import React, { Component } from 'react';
import {Modal, Spin} from '../commons'
import * as firebase from 'firebase';
import FlatList from 'flatlist-react';
import 'firebase/firestore'
import './User.css'


class User extends Component {
    constructor(props) {
        super(props);
        this.params = this.props.match.params
        this.state = { user: null, spaps :{} }
        this.ref = firebase.firestore()
    }

    componentDidMount(){
        // let array = Array.from(this.params.id)
        // array.splice(0,1)
        // let string = array.join('')
        
        this.ref.collection("users").doc(this.params.id).get().then(
            (d)=>{
                if(d.exists){
                    this.setState({user:d.data()})
                    this.ref.collection("galeria").where("user_id", "==", d.data().CPF).onSnapshot(this.alimentarSnaps.bind(this))
                }else{
                    console.log("erro")
                }

            }
        )
        
        

    }
    alimentarSnaps(q){
        let snaps =[];
        q.forEach((d)=>{
            snaps.push({
                ...d.data()
            })
        })
        this.setState({snaps})
        console.log(this.state.user)
        
    }
    snapsMake(snap){
        return  <div className="imgCard">
            <img src={snap.foto} alt="galeria"/>
        </div>
    }
    render() { 
        return ( 
        <div className="userConteiner">
            {this.state.user ? (<div className="profile">
                <div className="img">
                    
                    <img src={this.state.user.foto} alt="foto de perfil"/>
                </div>
                <div className="info">
                    <div className="pConteiner">
                    <p>
                        Nome:{this.state.user.nome}
                    </p>
                    <p>
                        RG:{this.state.user.RG}
                    </p>
                    <p>
                        CPF:{this.state.user.CPF}
                    </p>
                    </div>
                    <div className="pConteiner">
                    <p>
                        Nome da mãe:{this.state.user.nome_da_mae}
                    </p>
                    <p>
                        Nome do Pai:{this.state.user.nome_do_pai}
                    </p>
                    </div>
                    <div className="pConteiner">
                    <p>
                        Data de nascimento:{this.state.user.data_nascimento}
                    </p>
                    <p>
                        Data da ultima atualização:{this.state.user.data_cadastro}
                    </p>
                    </div>
                   
                    
                </div>
            </div>) : <Modal><Spin/></Modal>}
            
            <div className="snaps">
                <FlatList list={this.state.snaps} renderItem={this.snapsMake}/>
            </div>
        </div> );
    }
}
 
export default User;