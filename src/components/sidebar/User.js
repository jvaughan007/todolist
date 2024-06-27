import React from 'react';
import logo from '../../images/logoimg.jpg';

const User = () => {

    return (
        <div className='User'>
            <div className='logo'>
                <img className='logoimg' src={logo} alt='logo'/>
            </div>
            <div className='info'>
                <p>Some Username</p>
                <a href='#'>Logout</a>
            </div>
        </div>
    )
}

export default User;