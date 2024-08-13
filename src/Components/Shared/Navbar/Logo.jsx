import React from 'react';
import logo from '../../../assets/images/logo.png'
import { Link } from 'react-router-dom';
const Logo = () => {
    return (
        <Link to='/'>
            <img className='hidden md:block' height='100' width='100' src={logo} alt="LOGO" />
        </Link>
    );
};

export default Logo;