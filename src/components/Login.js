import React, { Component } from 'react';
import "./Login.css"
import { MeuLink, MeuBotao } from '../commons'
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"
import 'firebase/auth'




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { isSignedIn: false  }
        this.uiConfig = {
            signInFlow: "popup",
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            callbacks: {
              signInSuccess: () => false
            }
          }
    }
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
          this.setState({ isSignedIn: !!user })
          console.log("user", user)
        })
      }
    ativar(){
        firebase.auth().signInWithEmailAndPassword("joao.humble5@gmail.com", "abc456").then(()=>{
            console.log("sucess")
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div className="App">
            {this.state.isSignedIn ? (
              <span>
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <MeuLink text="Prosseguir para o site" to={`/m/${firebase.auth().currentUser.uid}`}/>
              </span>
            ) : (
                <div className="actions">
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
              <MeuBotao text="entrar como convidado" onClick={()=>this.ativar()}/>
              </div>
            )}
          </div>
                // <div className="form">
                //     <div className="formConteiner">
                //         <MeuInput label="Email" type="text" id="Email" placeholder="Ex: email@gmail.com" />
                //         <MeuInput label="Senha" type="password" id="Senha" placeholder="EX: Abc123" />

                //         <MeuLink text="Logar" />
                //         <MeuLink text="Cadastrar" to="/cadastro" />
                //         <MeuLink text="Entrar como visitante" to="/m" />
                //     </div>

                // </div>
           


        );
    }
}

export default Login;