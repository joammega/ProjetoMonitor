import React, { Component } from 'react';
import './Remover.css'
import { MeuInput, MeuBotao } from '../../commons'
import {Spin, Modal} from '../../commons';
import * as firebase from 'firebase/app'
import 'firebase/firestore'


class Remover extends Component {
    constructor(props) {
        super(props);
        this.state = { input: '', document: "CPF" , loading:false, msg : ""};
        this.ref = firebase.firestore().collection('users');

    }
    changeInput(e) {
        this.setState({ input: e.target.value })

    }
    deleteUser() {
        this.setState({loading:true, msg: ""})
        if (this.state.input.toString().length === 9) {

            this.ref.where('RG', "==", Number(this.state.input)).limit(1).get().then(
                (q) => {
                    if(q.size > 0){
                        q.forEach(
                            (d) => {
                                if (d.exists) {
                                    firebase.firestore().collection('galeria').where("user_id", "==", d.data().CPF).get().then(
                                        (q2) => {
                                            q2.forEach((d2) => {
                                                firebase.firestore().collection('galeria').doc(d2.id).delete()
                                            })
                                            
                                        }
                                    )
                                    this.setState({loading:false})
                                    this.ref.doc(d.id).delete()
                                } else {
                                    this.setState({loading:false})
                                    console.log("error")
                                }
    
    
                            }
                        )
                    }else{
                        this.setState({loading:false, msg:"Não existe esse usuário no sistema"}) 
                    }
                    
                }
            ).catch(
                (error)=>{
                    this.setState({loading:false, msg: error})
                }
            )
        }
        else if (this.state.input.toString().length === 11) {
            this.ref.where('CPF', "==", Number(this.state.input)).limit(1).get().then(
                (q) => {
                    if(q.size > 0){
                        q.forEach(
                            (d) => {
                                if (d.exists) {
                                    
                                        firebase.firestore().collection('galeria').where("user_id", "==", d.data().CPF).get().then(
                                            (q2) => {
                                                q2.forEach((d2) => {
                                                    firebase.firestore().collection('galeria').doc(d2.id).delete()
                                                })
                                                
                                            }
                                        )
                                        this.setState({loading:false})
                                        this.ref.doc(d.id).delete()
                                    } else {
                                        this.setState({loading:false})
                                        console.log("error")
                                    }
                                
                            })
                    }else{
                        this.setState({loading:false, msg:"Não existe esse usuário no sistema"}) 
                    }
                    
                }
            ).catch(
                (error)=>{
                    this.setState({loading:false, msg:error})
                }
            )
        }
        else {
            this.setState({loading:false, msg:"Documento com quantidade de dígitos errada"})
            console.log("erro")
            
        }
    }

    render() {
        return (
            <div className="remover">
                {this.state.loading? <Modal><Spin/></Modal> : null}
                <h2>
                    Remova um Usuário
                    </h2>
                <div className="input">
                    <MeuInput label="Informe o CPF ou RG" type="number" onChange={this.changeInput.bind(this)} />

                </div>

                {this.state.msg? <p className="pAlert">
                    {this.state.msg}
                </p> : null}
                <div className="submit">
                    <MeuBotao color="gray" text="Remova" onClick={() => this.deleteUser()} />
                </div>



            </div>
        );
    }
}

export { Remover };