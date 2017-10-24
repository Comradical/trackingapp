import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return(
            <div className="navbar navbar-toggleable-md navbar-light bg-faded">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">
                      Home
                    </Link>
                    <Link className="nav-item nav-link" to="/Campaigns">
                    Campaigns
                    </Link>
                </div>
            </div>
        );
    }
}