import React,{ Component } from 'react';
import Logo from '../images/logo.png';

import '../styles/header.css'

class Header extends Component{
    render() {
        return (
            <header>
                <img src={Logo} className="logo"/>
            </header>
        );
    }
}

export default Header;