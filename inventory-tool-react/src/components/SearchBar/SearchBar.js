import React from 'react'
import Style from './SearchBar.module.css'

const SearchBar = (props) => {
    return(
        <div className = {Style.SearchBar}>
            <i class="fas fa-search"></i>
            <input type="text" placeholder = {props.current.placeholder} value={props.current.value} onChange={props.searchChangeHandler}/>
        </div>
    )
}

export default SearchBar
