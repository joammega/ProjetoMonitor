import React, { Component } from 'react';
import './Recuperar.css'
import { MeuInput, MeuBotao, MeuLink, Modal, Spin } from '../../commons'
import * as firebase from 'firebase/app'
import 'firebase/firestore'


class Recuperar extends Component {
    constructor(props) {
        super(props);
        this.state = { input: '', id: null, loading: false, msg: "" }
        this.ref = firebase.firestore().collection('users')
    }
    changeInput(e) {
        this.setState({ input: e.target.value })

    }
    retrieveUser() {

        this.setState({loading:true, msg:""})
        if (this.state.input.toString().length === 9) {

            this.ref.where('RG', "==", Number(this.state.input)).limit(1).get().then(
                (q) => {
                    if(q.size === 0){
                        this.setState({loading:false, msg:"RG não cadastrado"})
                        return null
                    }
                    q.forEach(
                        (d) => {
                            if (d.exists) {
                                this.setState({loading:false})
                                this.setState({ id: d.id })
                            } else {
                                this.setState({loading:false, msg:"RG não cadastrado"})
                            }
                        }
                    )
                }
            )
        }
        else if (this.state.input.toString().length === 11) {
            this.ref.where('CPF', "==", Number(this.state.input)).limit(1).get().then(
                (q) => {
                    if(q.size === 0){
                        this.setState({loading:false, msg:"CPF não cadastrado"})
                        return null
                    }
                    q.forEach(
                        (d) => {
                            if (d.exists) {
                                this.setState({loading:false})
                                this.setState({ id: d.id })
                            } else {
                                this.setState({loading:false, msg:"CPF não cadastrado"})
                            }
                        }
                    )
                }
            )
        }
        else {
            this.setState({loading:false, msg:"Número de dígitos incorreto"})
        }
    }


    render() {
        return (
            <div className="recuperar">
                {this.state.loading ? <Modal><Spin /></Modal> : null}
                {
                    this.state.id ? (
                        <div className="parent2"> <h2>
                            Usuário encontrado</h2>
                            <MeuLink text="Acessar" to={`/u/${this.state.id}`} /></div>
                    ) : (
                            <div className="parent">
                                <h2>
                                    Encontre um Usuário
                                </h2>
                                <div className="input">
                                    <MeuInput label="Informe o CPF ou RG" type="number" onChange={this.changeInput.bind(this)} />

                                </div>

                                {this.state.msg ? <p className="pAlert">
                                    {this.state.msg}
                                </p> : null}
                                <div className="submit">
                                    <MeuBotao color="gray" text="Buscar" onClick={() => this.retrieveUser()} />
                                </div>
                            </div>
                        )
                }





            </div>
        );
    }
}

export { Recuperar };