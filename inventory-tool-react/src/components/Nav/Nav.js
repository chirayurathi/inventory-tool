import React from 'react'
import Style from './Nav.module.css'
import logo from '../../media/images/logo.png'
const Nav = (props) => {
    return(
        <nav className={Style.Nav}>
            <span><img src={logo} alt="logo" /> <span>Inventory Tool</span></span>
            {props.loggedout?null:<div className={Style.Buttons}>
                <button onClick={props.logoutHandler}>
                    Logout
                </button>
            </div>}
        </nav>
        )
}

export default Nav;