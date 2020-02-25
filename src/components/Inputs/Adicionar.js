import React, { Component } from 'react';
import { MeuInput, MeuBotao, Modal, Spin } from '../../commons'
import './Adicionar.css'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';




class Adicionar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "", file: null, progress: 0, loading: false, msg: ""
        }
    }
    
    adicionarUser(e) {
        this.setState({ loading: true, msg: "" })
        e.preventDefault()
        const CPF = e.target.CPF.value;
        const RG = e.target.RG.value;
        const nome= e.target.Nome.value;
        const nomeP = e.target.NomeP.value;
        const nomeM = e.target.NomeM.value;
        const dataN = e.target.Data.value;
        const file = e.target.Foto.files[0]
        const uid = this.props.uid

        if (e.target.Nome.value === "" || e.target.CPF.value === "" || e.target.RG.value === "" ||
            e.target.NomeP.value === "" || e.target.NomeM.value === "" || e.target.Data.value === "" ||
            e.target.Foto.files[0] === undefined) {
            this.setState({ loading: false, msg: "preencha todos os campos" })
            return null
        } else if (e.target.CPF.value.toString().length !== 11) {
            this.setState({ loading: false, msg: "CPF deve ter 11 digitos" })
            return null
        } else if (e.target.RG.value.toString().length !== 9) {
            this.setState({ loading: false, msg: "RG deve ter 9 digitos" })
            return null
        } else {
            firebase.firestore().collection('users').where("CPF", "==", Number(CPF)).get().then((q) => {
                
                if (q.size !== 0) {
                    console.log("oxe")
                    this.setState({ loading: false, msg: "RG já existe no sistema" })
                    return null;
                } else {
                    firebase.firestore().collection('users').where("RG", "==", Number(RG)).get().then((q2) => {
                        if (q2.size !== 0) {
                            this.setState({ loading: false, msg: "CPF já existe no sistema" })
                            return null;
                        } else {
                            const user = {
                                uid: uid,
                                nome: nome,
                                CPF: Number(CPF),
                                RG: Number(RG),
                                nome_do_pai: nomeP,
                                nome_da_mae: nomeM,
                                data_nascimento: dataN,
                                foto: "",
                                data_cadastro: Date(),
                            }

                            
                            this.setState({ file })

                            const uploadTask = firebase.storage().ref(`imagens/${file.name}`).put(file);
                            uploadTask.on('state_changed',
                                (snapshot) => {
                                    // progrss function ....
                                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                    this.setState({ progress });
                                },
                                (error) => {
                                    // error function ....
                                    this.setState({ loading: false, msg: error })
                                    console.log(error);
                                },
                                () => {
                                    // complete function ....
                                    firebase.storage().ref('imagens').child(file.name).getDownloadURL().then(url => {
                                        console.log(url);
                                        this.setState({ url });
                                        user.foto = url
                                        firebase.firestore().collection('users').add(user).then(() => {
                                            let foto = {
                                                user_id: user.CPF,
                                                foto: user.foto
                                            }
                                            firebase.firestore().collection('galeria').add(foto).then(() => {
                                                this.setState({ loading: false })
                                                window.location.reload()
                                            }
                                            ).catch(
                                                (error) => {
                                                    this.setState({ loading: false, msg: error })
                                                    console.log(error)
                                                }
                                            )
                                        })
                                            .catch((error) => {
                                                this.setState({ loading: false, msg: error })
                                                console.log(error)
                                            })


                                    })

                                });
                        }
                    })
                }
            }
            )
        }



    }


    render() {
        return (
            <div className="adicionar" >
                {this.state.loading ? <Modal><Spin /></Modal> : null}
                <h3>
                    Adicionar um novo Usuário
                </h3>
                <form onSubmit={this.adicionarUser.bind(this)}>
                    <div className="input">
                        <MeuInput label="Nome" id="Nome" placeholder="Ex:Jose Fonceca Ciqueira" type="text" />
                        <MeuInput label="RG" id="RG" placeholder="Ex: 123456789" type="number" />
                        <MeuInput label="CPF" id="CPF" placeholder="Ex:32132132132" type="number" />
                    </div>
                    <div className="input">
                        <MeuInput label="Nome do Pai" id="NomeP" placeholder="Ex: Joaquin Fonceca Ciqueira" type="text" />
                        <MeuInput label="nome da Mãe" id="NomeM" placeholder="Ex: Joaquina Fonceca Ciqueira" type="text" />
                    </div>
                    <div className="input">
                        <MeuInput label="Data de nascimento" id="Data" type="date" />
                        <MeuInput label="Foto" id="Foto" type="file" />
                    </div>
                    {this.state.msg ? <p className="alert">
                        {this.state.msg}
                    </p> : null}
                    <div className="submit">
                        <MeuBotao text="Adicione" color="gray" />
                    </div>
                </form>





            </div>
        );
    }
}

export { Adicionar };