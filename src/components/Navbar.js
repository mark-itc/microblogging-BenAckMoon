import React from 'react';
import {
    Link,
} from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <navbar>
                <Link to='/' className='navbar-item'> Home </Link>
                <Link to='/profile' className='navbar-item'> Profile </Link>
            </navbar>
        );
    }
}