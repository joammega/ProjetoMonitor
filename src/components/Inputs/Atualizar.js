import React, { Component } from 'react';
import { MeuBotao, MeuInput, Modal, Spin } from '../../commons'
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

import './Atualizar.css';

class Atualizar extends Component {
    constructor(props) {
        super(props);
        this.state = { file: null, progress:0, url:"" , loading:false, msg: ""}
    }
    changeInput(e) {
        this.setState({ file: e.target.files[0] })
    }
    updateUser() {
        this.setState({loading:true, msg:""})
        const file = this.state.file;
        const id = this.props.id;
        const CPF = this.props.CPF
        if(file === undefined){
            this.setState({loading:false, msg:"Escolha uma imagem"})
            return null
        }
        const uploadTask = firebase.storage().ref(`imagens/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({ progress });
            },
            (error) => {
                // error function ....
                this.setState({loading:false, msg:error})
            },
            () => {
                // complete function ....
                firebase.storage().ref('imagens').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({ url });
                    
                    firebase.firestore().collection('users').doc(id).update({
                        foto:url,
                        data_cadastro: Date()
                    }).then(() => {
                        let foto = {
                            user_id: CPF,
                            foto: url
                        }
                        firebase.firestore().collection('galeria').add(foto).then(() => {
                            this.setState({loading:false})
                            window.location.reload()
                        }
                        ).catch(
                            (error) => {
                                this.setState({loading:false, msg:error})
                            }
                        )
                    })
                        .catch((error) => {
                            
                            this.setState({loading:false, msg:error})
                        })


                })

            });
    }
    render() {
        return (
            <div className="atualizar">
                {this.state.loading? <Modal><Spin/></Modal> : null}
                <h2>
                    Atualize a foto desse usuário
                    </h2>
                <div className="input">
                    <MeuInput label="Escolha uma nova foto" type="file" onChange={this.changeInput.bind(this)} />

                </div>
                {this.state.msg? <p className="pAlert">
                    {this.state.msg}
                </p> : null}

                <div className="submit">
                    <MeuBotao color="gray" text="Remova" onClick={() => this.updateUser()} />
                </div>



            </div>

        );
    }
}

export { Atualizar };