
import React, { Component } from 'react';
import './NavBar.css';

import { Button } from 'reactstrap';
import { MdMenu } from 'react-icons/lib/md';

/**
 * Referência: https://bootstrapious.com/p/bootstrap-sidebar
 */
export default class NavBar extends Component {

    render() {
        const { active, toggleSideBar } = this.props;
        return (
            <nav id="navbar" className={active ? "active" : null}>
                <Button type="button" id="sidebarCollapse" onClick={toggleSideBar}>
                    <MdMenu />
                    <span>Menu</span>
                </Button>

                <h4 id="navbar-title">Projeto React</h4>
            </nav>
        );
    }

}