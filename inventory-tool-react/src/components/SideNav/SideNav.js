import React from 'react'
import Style from './SideNav.module.css'

const SideNav = (props) => {
    return(
        <ul className = {Style.SideNav}>
            <li onClick={()=>{props.activeLinkChangeHandler("employee")}} className={props.activeLink==="employee"?Style.Active:null}><span></span> Employees </li>
            <li onClick={()=>{props.activeLinkChangeHandler("system")}} className={props.activeLink==="system"?Style.Active:null}><span></span> system </li>
            <li onClick={()=>{props.activeLinkChangeHandler("furniture")}} className={props.activeLink==="furniture"?Style.Active:null}><span></span> Furniture </li>
            <li onClick={()=>{props.activeLinkChangeHandler("other")}} className={props.activeLink==="other"?Style.Active:null}><span></span> Others </li>
            <li>Export CSV </li>
        </ul>
    )
}

export default SideNav
