import React from 'react';
import {Link, withRouter} from 'react-router-dom';


import './header.component.scss';
import {Dropdown} from '../dropdown/dropdown.component';

export const Header = withRouter((props) => {
    
    return (
        <div className="header">
            <Link to="/">
                Home
            </Link>
            {props.location.pathname === '/' && (<Dropdown />)}
        </div>
    );
});