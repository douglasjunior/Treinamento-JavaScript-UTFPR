import React, { Component } from 'react';
import './SideBar.css';

import { Link, Route, withRouter } from 'react-router-dom';

import { removeToken } from '../utils/LoginManager';

/**
 * Referência: https://bootstrapious.com/p/bootstrap-sidebar
 */
class SideBar extends Component {

    onSairClick = (event) => {
        event.preventDefault();
        removeToken();
        this.props.history.push('/');
    }

    render() {
        const { active } = this.props;
        return (
            <nav id="sidebar" className={active ? "active" : null}>
                <div className="sidebar-header">
                    <h3>Projeto React</h3>
                </div>

                <ul className="list-unstyled components">
                    <CustomLink to="/" exact>Home</CustomLink>
                    <CustomLink to="/tarefas">Tarefas</CustomLink>
                </ul>
                <ul className="list-unstyled components">
                    <li><a href="/" onClick={this.onSairClick}>Sair</a></li>
                </ul>
            </nav>
        );
    }
}

const CustomLink = (props) => (
    <Route path={props.to}
        exact={props.exact}
        children={(_props) => (
            <li className={_props.match ? 'active' : null} >
                <Link to={props.to} >{props.children}</Link>
            </li>
        )}
    />
)

export default withRouter(SideBar);