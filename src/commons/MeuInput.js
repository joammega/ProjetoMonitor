import React, { Component } from 'react';
import './MeuInput.css'

class MeuInput extends Component {
    state = {}
    render() {
        return (
            
                <div className='inputForm'>
                    <label for={this.props.id}>

                        {this.props.label}
                    </label>
                    <input {...this.props} >

                    </input>
                </div>
            


        );
    }
}

export { MeuInput };