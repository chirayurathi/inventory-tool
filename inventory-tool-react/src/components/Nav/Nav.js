import React from 'react'
import Style from './Nav.module.css'

const Nav = (props) => {
    return(
        <nav className={Style.Nav}>
            <span>Inventory Tool</span>
            {props.loggedout?null:<div className={Style.Buttons}>
                <button onClick={props.logoutHandler}>
                    Logout
                </button>
            </div>}
        </nav>
        )
}

export default Nav;