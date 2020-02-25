import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './MeuLink.css'

class MeuLink extends Component {
    state = {}
    render() {
        return (
            <div className="linkConteiner">
                <Link className='link' to={this.props.to}>
                    {this.props.text}

                </Link>
            </div>

        );
    }
}

export { MeuLink };