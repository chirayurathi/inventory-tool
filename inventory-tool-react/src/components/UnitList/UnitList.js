import React from 'react'
import Style from './UnitList.module.css'

const UnitList = (props) => {
    return(
        <div className={Style.UnitList}>
                <div className={Style.Head}>
                <div onClick={props.backHandler}><i class="fas fa-arrow-left"></i></div> 
                <h1>Units</h1> 
                <button onClick={()=>{props.addToggleHandler("unit")}}>Add Unit</button> 
            </div>
            <ul className={Style.Heads}>
                <li>Barcode</li>
                <li>Status</li>
                <li>Added On</li>
                <li>Shipped On</li>
            </ul>
            {props.activeProductUnit?<div className={Style.List}>
                {props.activeProductUnit.map(element => {
                return(<li className={Style.Element} onClick={()=>{props.selectUnitHandler(element.barcode)}}>
                    <ul>
                        <li>{element.barcode}</li>
                        <li>{element.status}</li>
                        <li>{element.added_on}</li>
                        <li>{element.shipped_on}</li>
                    </ul>
                </li>)  
                })}
            </div>:null}
        </div>
        )
}

export default UnitList;